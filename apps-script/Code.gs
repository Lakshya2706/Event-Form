/**
 * Bliss Now — Event registration form → Google Sheet
 *
 * Open the "Bliss Now – Event Registrations" Sheet → Extensions → Apps Script.
 * Paste this into Code.gs, and add an HTML file named "Index" with the contents of Index.html.
 * Then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 *
 * The Sheet is already set up: headers, status dropdown, colours, the WhatsApp
 * "Chat" link column (L) and the Summary tab. This script only adds rows.
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

/** Called by the form. Adds one row per registration (columns A–K; L fills itself). */
function submit(data) {
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
