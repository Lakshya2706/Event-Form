# Bliss Now – Event Registration Form

Registration form for the **Wellness & Recovery Experience, 28 November 2026**. Every submission is saved as a new row in a Google Sheet that the team uses for WhatsApp follow-up.

| | Link |
|---|---|
| Live form | https://script.google.com/macros/s/AKfycbxmqsw2KUehFRMu8phlLsXjhEVj7Y_ffZKQpNnv53bk-3jvhKyAw5mlraCFMQilAEsLIA/exec |
| Registrations sheet | https://docs.google.com/spreadsheets/d/1cR1uMJEZVPpOTwE6hRO64WK4G5EQpt-mfEz6CegMiqg/edit |

## Files

```
apps-script/
  Code.gs      Serves the form and writes each submission to the Sheet
  Index.html   The form page (Bliss Now branding, logo embedded)
assets/
  logo.png     Bliss Now logo, transparent background
```

The form uses the Bliss Now brand guide: Blissful Mint `#A2D3BE`, Cormorant Garamond for headings and Jost for body text.

## How it works

The form is hosted by Google Apps Script as a web app. When someone submits, `submit()` in `Code.gs` adds a row to the **Registrations** tab:

Submitted at, Full name, WhatsApp number, Interested for, Areas of interest, Insurance provider, WhatsApp consent, Event, Follow-up status (starts as "New"), Called by, Notes.

The Sheet also has:
- **Open WhatsApp** column with a "Chat" link per row (local `05x` numbers are converted to `+971`)
- **Follow-up status** dropdown: New, Contacted, No answer, Booked, Not interested
- **Summary** tab with live counts by status, by who it's for and by area of interest

## Updating the form

1. Edit the files in this repo and commit.
2. Copy the changed file into the Apps Script project (Code.gs or Index).
3. In Apps Script: **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The live link stays the same.

To take the form offline: **Deploy → Manage deployments → Archive**.

## Later

- Move the form to the company domain (cPanel) while keeping the Google Sheet as the data store.
- Connect registrations to the CRM.
