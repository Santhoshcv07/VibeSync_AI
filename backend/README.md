# VibeSync AI Backend

FastAPI backend for the VibeSync AI entertainment discovery platform.

## Current Status

Phase 2 setup only.

The backend currently provides:

- Root health response
- Dedicated health-check endpoint
- Automatic OpenAPI documentation

## Local Development

From the repository root:

```powershell
.\backend\.venv\Scripts\Activate.ps1
uvicorn app.main:app --app-dir backend --reload
```

Local API:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

Health endpoint:

`http://127.0.0.1:8000/health`

## Important

Do not commit:

* `.venv/`
* `.env`
* API keys
* Database credentials
* Authentication secrets
