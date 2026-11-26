# Bliss Now – Event Registration Form

Registration form for the **Wellness & Recovery Experience, 28 November 2026**. Every submission is saved as a new row in a Google Sheet that the team uses for WhatsApp follow-up.

| | Link |
|---|---|
| Live form | https://script.google.com/macros/s/AKfycbxmqsw2KUehFRMu8phlLsXjhEVj7Y_ffZKQpNnv53bk-3jvhKyAw5mlraCFMQilAEsLIA/exec |
| Registrations sheet | https://docs.google.com/spreadsheets/d/1cR1uMJEZVPpOTwE6hRO64WK4G5EQpt-mfEz6CegMiqg/edit |

## Files

```
web/
  index.html   The form for the company website. Upload this to the server (cPanel).
               It sends each submission to the Apps Script link below.
apps-script/
  Code.gs      Receives submissions (doPost) and serves the Google-hosted form (doGet)
  Index.html   Same form page, used by the Google-hosted link
assets/
  logo.png     Bliss Now logo, transparent background
```

The form uses the Bliss Now brand guide: Blissful Mint `#A2D3BE`, Cormorant Garamond for headings and Jost for body text.

## How it works

The form page lives on the company website (`web/index.html`). When someone submits, the page sends the details to the Apps Script web app (the live form link above), and `submit()` in `Code.gs` adds a row to the **Registrations** tab. The Google link also still works as a backup copy of the form, writing to the same Sheet.

Each row has:

Submitted at, Full name, WhatsApp number, Interested for, Areas of interest, Insurance provider, WhatsApp consent, Event, Follow-up status (starts as "New"), Called by, Notes.

The Sheet also has:
- **Open WhatsApp** column with a "Chat" link per row (local `05x` numbers are converted to `+971`)
- **Follow-up status** dropdown: New, Contacted, No answer, Booked, Not interested
- **Summary** tab with live counts by status, by who it's for and by area of interest

A hidden "website" field catches spam bots: submissions that fill it are ignored.

## Putting the form on the server (cPanel)

1. In cPanel, create the subdomain or folder for the form (for example a subdomain pointing to its own folder).
2. Upload `web/index.html` into that folder with File Manager.
3. Open the address and submit a test entry with TEST in the name; check it appears in the Sheet, then delete the row.

## Updating the form

1. Edit the files in this repo and commit.
2. Form page changes: upload the new `web/index.html` to the server (and copy it into the Apps Script `Index` file to keep the Google link in step).
3. Code.gs changes: paste into Apps Script, then **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The link stays the same, so the website keeps working.

To take the form offline: **Deploy → Manage deployments → Archive**.

## Later

- Move the form to the company domain (cPanel) while keeping the Google Sheet as the data store.
- Connect registrations to the CRM.
