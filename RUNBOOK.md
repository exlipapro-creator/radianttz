# RUNBOOK — Radiant Company Limited Corporate Portal

## Prerequisites
- Node.js 22+
- npm 10+

## Install Dependencies
```bash
cd app
npm install
```

## Build
```bash
npm run build
```

## Start (Production)
```bash
# Default port 3000
npm start

# Custom port
PORT=8080 npm start
```

## Development Server
```bash
npm run dev
# Runs on http://localhost:3000
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | HTTP port (default: 3000) |
| `DROIDBOT_PUBLIC_URL` | No | Public base URL for OG tags (default: https://www.radianttz.com) |
| `DROIDBOT_SMTP_HOST` | No | SMTP host (default: smtp.gmail.com) |
| `DROIDBOT_SMTP_PORT` | No | SMTP port (default: 465) |
| `DROIDBOT_SMTP_USER` | No | SMTP username/email |
| `DROIDBOT_SMTP_PASS` | No | SMTP password/app password |
| `INQUIRY_TO_EMAIL` | No | Recipient email for inquiries (default: info@radianttz.co.tz) |
| `INQUIRY_FROM_EMAIL` | No | Sender email for inquiries |
| `DROIDBOT_TEST_URL` | No | Base URL for API tests (default: http://localhost:3000) |

## Run API Tests
```bash
# Install vitest if not present
npm install -D vitest

# Start the server first, then:
DROIDBOT_TEST_URL=http://localhost:3000 npx vitest run tests/api.test.ts
```

## Quick Smoke Test
```bash
# Start the server, then:
curl -s http://localhost:3000/ | grep -q "Radiant" && echo "OK"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/does-not-exist  # expect 404
curl -s -X POST http://localhost:3000/api/inquiry -H 'Content-Type: application/json' -d '{}' | python3 -m json.tool  # expect 400
curl -s -X GET http://localhost:3000/api/inquiry  # expect 405
```
