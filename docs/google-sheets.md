# Google Sheets – Apps Script Web App (Lead Capture)

Use this script so `/api/leads` can append rows to a Google Sheet via a server-to-server POST (no CORS).

## 1. Create a Google Sheet

Create a new Google Sheet (or use an existing one). The script will create a sheet named **Leads** if it doesn’t exist.

## 2. Add the script

1. In the Sheet: **Extensions → Apps Script**.
2. Replace the default code with the script below.
3. **Save** (Ctrl+S) and name the project (e.g. "VR Leads").

## 3. Script code

```javascript
/**
 * VR Consultancy – Lead capture webhook
 * Deploy as Web App and use the /exec URL in Vercel env: GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'No payload' });
    }

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'submittedAt', 'source', 'name', 'email', 'phone', 'city',
        'preferredIntake', 'interest', 'notes', 'pageUrl',
        'utm_source', 'utm_medium', 'utm_campaign'
      ]);
    }

    var utm = data.utm || {};
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.source || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.preferredIntake || '',
      data.interest || '',
      data.notes || '',
      data.pageUrl || '',
      utm.source || '',
      utm.medium || '',
      utm.campaign || ''
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 4. Deploy as Web App

1. In Apps Script: **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. **Description:** e.g. "VR Leads webhook".
4. **Execute as:** Me.
5. **Who has access:** Anyone with the link (or Anyone – only the POST body is used).
6. **Deploy** and copy the **Web app URL** (it ends with `/exec`).

## 5. Configure Vercel

In your Vercel project → **Settings → Environment Variables**:

- **Key:** `GOOGLE_SHEETS_WEBHOOK_URL`
- **Value:** the full `/exec` URL (e.g. `https://script.google.com/macros/s/.../exec`).

Redeploy so the new env is used. Submissions from the site will then append rows to the **Leads** sheet.
