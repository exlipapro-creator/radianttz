# INTEGRATIONS — Radiant Company Limited Corporate Portal

## Email (SMTP via Nodemailer)

The inquiry form sends form submissions to `info@radianttz.co.tz` via SMTP.
The app functions without these configured (graceful no-op — submissions are accepted but not emailed).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DROIDBOT_SMTP_HOST` | Yes* | SMTP server host (default: `smtp.gmail.com`) |
| `DROIDBOT_SMTP_PORT` | No | SMTP port (default: `465`) |
| `DROIDBOT_SMTP_USER` | Yes* | SMTP username / email address |
| `DROIDBOT_SMTP_PASS` | Yes* | SMTP password or app password |
| `INQUIRY_TO_EMAIL` | No | Recipient email for inquiry notifications (default: `info@radianttz.co.tz`) |
| `INQUIRY_FROM_EMAIL` | No | Sender email for inquiry notifications (defaults to SMTP_USER) |

*Required to enable email delivery. Without these, the form accepts submissions with a success response but does not email them.

### How to Get Credentials

**Gmail:**
1. Enable 2-factor authentication on your Google account.
2. Go to https://myaccount.google.com/apppasswords.
3. Create an app password for "Mail".
4. Use your Gmail address as `DROIDBOT_SMTP_USER` and the 16-character app password as `DROIDBOT_SMTP_PASS`.
5. Set `DROIDBOT_SMTP_HOST=smtp.gmail.com` and `DROIDBOT_SMTP_PORT=465`.

**Resend SMTP:**
1. Sign up at https://resend.com.
2. Verify your sending domain.
3. Create an API key.
4. Set `DROIDBOT_SMTP_HOST=smtp.resend.com`, `DROIDBOT_SMTP_PORT=465`, `DROIDBOT_SMTP_USER=resend`, `DROIDBOT_SMTP_PASS=<your-resend-api-key>`.

### Quick Test
After configuring, submit the inquiry form at `/` (Contact section). You should receive an email at `info@radianttz.co.tz`.

---

## No Other Integrations

This is a static marketing site with no payments, no auth, and no external APIs required.
