/**
 * Bliss Now — Event registration form → Google Sheet
 *
 * Two ways in, same Sheet:
 *  - doGet():  serves the form at the Google web-app link (Index.html)
 *  - doPost(): receives submissions from the form hosted on the company domain (web/index.html)
 *
 * After changing this file: Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.
 * The /exec link stays the same.
 */

const SHEET_ID = '1cR1uMJEZVPpOTwE6hRO64WK4G5EQpt-mfEz6CegMiqg';
const SHEET_NAME = 'Registrations';

/** Serves the registration form at the web-app link. */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Bliss Now · Registration')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Receives a submission from the form on the company website. */
function doPost(e) {
  let result;
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    result = submit(data);
  } catch (err) {
    result = { ok: false };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Adds one row per registration (columns A–K; column L fills itself). */
function submit(data) {
  data = data || {};
  if (data.website) return { ok: true };                      // spam trap: bots fill hidden fields
  if (!data.name || String(data.name).trim().length < 2) return { ok: false };
  if (String(data.phone || '').replace(/\D/g, '').length < 8) return { ok: false };

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const row = Math.max(sheet.getLastRow(), 1) + 1;
    sheet.getRange(row, 1, 1, 11).setValues([[
      new Date(),
      clean_(data.name),
      clean_(data.phone),
      clean_(data.who),
      clean_(data.interests),
      clean_(data.insurance),
      clean_(data.consent),
      clean_(data.event),
      'New', '', ''
    ]]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

/** Trims input, caps length, and stops values being read as formulas (e.g. "+971…" or "=…"). */
function clean_(v) {
  v = String(v == null ? '' : v).trim().slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
