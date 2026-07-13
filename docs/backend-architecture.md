# VibeSync AI Backend Architecture

## Document Status

- Phase: Phase 5 — Backend Foundation and Frontend Integration
- Step: Step 5.1 — Backend Inspection and Integration Planning
- Status: Planned
- Implementation status: Not started

## Verified Existing Backend

Record only verified repository facts:

- Language: Python
- Framework: FastAPI
- Framework version: Could not verify exact version from requirements.txt (fastapi)
- Runtime: Python (verified via .python-version/.venv)
- Dependency manager: pip
- Dependency file: requirements.txt
- Application entry point: app.main:app
- Development command: `uvicorn app.main:app --app-dir backend --reload`
- Existing modules: app.main
- Existing routes: `GET /`, `GET /health`
- Existing tests: Not present
- Existing CORS behavior: Configured in `main.py` allowing `http://localhost:3000`
- Existing environment configuration: `.env.example` exists, not wired in `main.py`
- Existing database integration: Not present
- Existing authentication: Not present
- Existing AI integration: Not present
- Existing provider integration: Not present

## Backend Design Principles

The VibeSync AI backend will follow these principles:

1. Keep route handlers thin.
2. Keep business logic in services.
3. Validate all external input.
4. Return stable typed response contracts.
5. Use one consistent API error format.
6. Keep database access behind repository or service boundaries.
7. Keep AI-provider code behind an application-owned generation interface.
8. Keep entertainment-provider integrations behind provider adapters.
9. Do not expose provider credentials to the frontend.
10. Do not expose internal exceptions to clients.
11. Use environment variables for secrets and environment-specific configuration.
12. Keep frontend contracts versioned and predictable.
13. Add features incrementally with tests.
14. Prefer simple architecture before distributed architecture.
15. Avoid premature microservices.

## Planned API Versioning

Planned base path:

`/api/v1`

Rules:

- Product application endpoints will use `/api/v1`.
- Health and operational endpoints may remain outside the product API namespace if the verified backend framework and deployment strategy justify it.
- Breaking contract changes require a new API version.
- Non-breaking additive fields may remain within the same version.
- Frontend code must not hard-code endpoint paths across many components.

## Planned Backend Module Boundaries

Planned — not implemented.

Proposed structure only. Do not create these files in Step 5.1.

```text
backend/
  app/
    main.py                 # Application entry point and API/router registration
    config.py               # Configuration and environment variables
    health/                 # Health check routers
    errors/                 # Common errors and exception handlers
    schemas/                # Common response contracts
    auth/                   # Authentication module
    users/                  # Users module
    profiles/               # Profiles module
    preferences/            # User preferences
    vibes/                  # Vibe generation module
    saved_vibes/            # Saved vibes module
    history/                # Vibe history module
    ai/                     # AI generation provider adapters
    providers/              # Entertainment provider adapters
    database/               # Database core and sessions
  tests/                    # Backend testing suite
```

## Planned Health Contract

Proposed endpoint:

`GET /health`

Proposed success status:

`200 OK`

Proposed response:

```json
{
  "status": "ok",
  "service": "vibesync-api",
  "version": "0.1.0"
}
```

## Planned Standard Success Envelope

Proposed envelope:

```json
{
  "data": {},
  "meta": {}
}
```

- `data` contains the response payload.
- `meta` is optional.
- Simple operational endpoints such as health may use a direct response if documented.
- Do not wrap responses inconsistently.
- Final implementation must follow verified framework conventions.

## Planned API Error Contract

Proposed response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be processed.",
    "details": [
      {
        "field": "mood",
        "message": "Select a supported mood."
      }
    ],
    "request_id": null
  }
}
```

Rules:

- `code` is stable and machine-readable.
- `message` is safe for users.
- `details` is optional.
- `request_id` is optional until request tracing exists.
- Internal stack traces must never be returned.
- Secrets must never appear in errors.
- Provider errors must be normalized.

## Planned Initial Product Contracts

Planned — not implemented.

### Generate Vibe

POST /api/v1/vibes/generate

Request:
```json
{
  "mood": "chill",
  "duration_minutes": 60
}
```

Planned response areas:
- Vibe identity
- Mood
- Duration
- Summary
- Music recommendations
- Video recommendations
- Visual inspiration
- Movie or series recommendations
- Book recommendations
- Generation metadata

Exact final recommendation schema will be defined before AI integration.
Provider URLs must be validated.
Provider credentials remain backend-only.
The first implementation may use deterministic mock data before AI.

### Saved Vibes
- GET /api/v1/saved-vibes
- POST /api/v1/saved-vibes
- DELETE /api/v1/saved-vibes/{vibe_id}

### Vibe History
- GET /api/v1/vibe-history
- DELETE /api/v1/vibe-history

### Profile
- GET /api/v1/profile
- PATCH /api/v1/profile

### Settings
- GET /api/v1/settings
- PATCH /api/v1/settings

### Authentication
- POST /api/v1/auth/signup
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET /api/v1/auth/me

## Authentication Boundary

Authentication is not implemented in Step 5.1.

Future requirements:

- Passwords must never be stored in plaintext.
- Passwords must never be logged.
- Authentication errors must not expose sensitive account details.
- Authentication state must use a deliberately selected strategy.
- Token or session strategy must be documented before implementation.
- Frontend authentication behavior must not be connected until backend contracts and security controls are verified.
- Protected routes must not be added until authentication is real.

Pending architecture decision.

## Database Boundary

Database integration is not implemented in Step 5.1.

Future persisted domains may include:

- Users
- Profiles
- User preferences
- Saved Vibes
- Vibe history
- Generated Vibe records
- Authentication/session data if required

Rules:

- Database choice must be documented before implementation.
- ORM or query-layer choice must match the verified backend ecosystem.
- Migrations must be used for schema changes.
- Route handlers must not contain scattered raw database logic.
- Secrets must remain in environment variables.
- Development and production database configuration must remain separate.

Current database status: Not present.

## AI Generation Boundary

AI integration is not implemented in Step 5.1.

Future architecture:

Frontend
→ Vibe generation endpoint
→ Vibe generation service
→ Application-owned AI interface
→ Selected AI provider adapter

Rules:

- Frontend must never call the AI provider directly.
- AI API keys remain backend-only.
- Provider-specific response formats must not leak into frontend contracts.
- AI output must be validated before returning it.
- AI output must be normalized into the VibeSync response schema.
- Timeouts must be configured.
- Provider failures must use the standard API error contract.
- Unsafe or malformed output must fail safely.
- A deterministic mock generator should be implemented before real AI integration.

Groq API: Candidate provider — not integrated.

## Entertainment Provider Boundaries

Provider integrations are not implemented in Step 5.1.

Future provider categories:

- Music
- Video
- Visual inspiration
- Movie or series discovery
- Books and reading

Rules:

- Provider-specific logic remains behind adapters.
- Provider credentials remain backend-only.
- Frontend receives normalized VibeSync-owned contracts.
- External URLs must be validated.
- Missing provider data must degrade gracefully.
- Provider failure must not crash the complete Vibe response.
- Provider logos and copyrighted media must follow provider terms before production use.

## Planned Frontend API Architecture

Planned responsibilities:

- One centralized backend base URL configuration
- One shared request utility
- Typed request contracts
- Typed response contracts
- Standard API error normalization
- Request cancellation where useful
- Explicit loading states
- Explicit empty states
- Explicit error states
- No API calls scattered across visual components
- No backend URL hard-coded across pages

Proposed future frontend location:

`frontend/src/lib/api/`

Possible planned files:
- client.ts
- config.ts
- errors.ts
- types.ts
- health.ts
- vibes.ts
- saved-vibes.ts
- history.ts
- profile.ts
- settings.ts
- auth.ts

Proposed structure only. Do not create these files in Step 5.1.

## Planned Environment Variables

Categories:
- Application environment
- Backend host
- Backend port
- Allowed frontend origins
- Database URL
- AI provider API key
- Provider API keys
- Logging level

Rules:

- Only public-safe values may use `NEXT_PUBLIC_`.
- Secrets must never use `NEXT_PUBLIC_`.
- Secrets must never be committed.
- `.env.example` may be created only in a later implementation step with placeholders.
- Real values must not appear in documentation.
- Do not create `.env` in Step 5.1.

## Planned CORS Strategy

CORS is not implemented in Step 5.1 unless already present.

Local development should allow only the verified frontend development origin.

Production should allow only explicitly configured trusted origins.

Rules:

- Do not use wildcard origins with credentials.
- Do not allow every origin by default.
- Keep allowed origins environment-configurable.
- Keep allowed methods minimal.
- Keep allowed headers minimal.
- Verify preflight behavior during implementation.

Existing CORS status: Implemented allowing `http://localhost:3000`.

## Planned Validation Strategy

Validate:

- Mood values
- Duration values
- Vibe identifiers
- Profile fields
- Settings fields
- Pagination values
- Filter values
- Sort values
- External provider URLs
- AI-generated output

Rules:

- Reject unsupported values.
- Use framework-native typed validation where appropriate.
- Return the standard API error contract.
- Do not trust frontend validation alone.
- Keep validation rules shared or clearly synchronized with frontend contracts.

## Planned Logging and Privacy

May log:

- Request method
- Safe route path
- Response status
- Request duration
- Safe request identifier

Must not log:

- Passwords
- Authentication tokens
- API keys
- Provider secrets
- Full authorization headers
- Sensitive profile data
- Private settings
- Full AI prompts containing user data
- Full provider responses containing unnecessary user information

## Planned Backend Testing Strategy

Test layers:

1. Configuration tests
2. Health-route tests
3. Schema-validation tests
4. Service-unit tests
5. Route-contract tests
6. Error-contract tests
7. Authentication tests when implemented
8. Database integration tests when implemented
9. AI-adapter tests using mocks
10. Provider-adapter tests using mocks

Rules:

- Tests must not call paid AI APIs.
- Tests must not require real provider credentials.
- Tests must not modify production data.
- External services must be mocked.
- Error paths must be tested.

## Planned Frontend Integration Testing

Verify:

- Backend unavailable state
- Loading state
- Success state
- Validation-error state
- Standard API error state
- Timeout state
- Empty state
- Retry behavior where appropriate
- Cancellation behavior where appropriate
- Refresh behavior
- Authentication-expired behavior when authentication exists

The current Phase 4 prototype must remain stable while integration is introduced incrementally.

## Phase 5 Implementation Roadmap

- Step 5.1 — Inspect the existing backend and plan the integration architecture
- Step 5.2 — Establish the verified backend application foundation
- Step 5.3 — Add configuration, environment validation, and safe CORS
- Step 5.4 — Add the health endpoint and standard API contracts
- Step 5.5 — Add backend testing foundations
- Step 5.6 — Add the centralized frontend API client
- Step 5.7 — Connect frontend/backend health verification
- Step 5.8 — Define and implement deterministic mock Vibe generation contracts
- Step 5.9 — Connect Generate Vibe to the backend mock generator
- Step 5.10 — Add persistence architecture and database foundation
- Step 5.11 — Add authentication foundation
- Step 5.12 — Connect signup and login
- Step 5.13 — Add profile persistence
- Step 5.14 — Add settings persistence
- Step 5.15 — Add Saved Vibe persistence
- Step 5.16 — Add Vibe History persistence
- Step 5.17 — Add the application-owned AI generation interface
- Step 5.18 — Integrate the selected AI provider safely
- Step 5.19 — Add entertainment-provider adapters incrementally
- Step 5.20 — Run the complete Phase 5 integration audit and prepare the checkpoint

Roadmap note:

This roadmap may be refined only when verified repository constraints, security requirements, or implementation results justify a change.

## Step 5.1 Out of Scope

Not implemented in this step:

- Backend application changes
- API endpoints
- Health endpoint
- CORS changes
- Environment loading
- Database
- Migrations
- Authentication
- Authorization
- Password hashing
- JWT
- Sessions
- Cookies
- AI generation
- AI provider integration
- Entertainment provider integration
- Frontend API client
- Frontend fetch calls
- Browser storage
- Analytics
- Tracking
- Notifications
- Uploads
- Payments
- Subscriptions
- Deployment

## Architecture Decisions

### Confirmed

- Language is Python.
- Framework is FastAPI.
- Dependencies managed via pip (requirements.txt).
- Existing CORS allows http://localhost:3000.
- Application entry point is `app.main:app`.
- Phase 4 Frontend architecture is purely client-side React state, static module data, and URL params.

### Planned

- Version product APIs under `/api/v1`.
- Keep route handlers thin.
- Keep business logic in services.
- Keep AI providers behind an application-owned interface.
- Keep entertainment providers behind adapters.
- Centralize frontend API access.
- Use stable typed contracts.
- Normalize API errors.
- Keep secrets backend-only.
- Add deterministic mock generation before real AI integration.
- Introduce persistence incrementally.
- Preserve the Phase 4 frontend while integration is added.

### Pending

- Authentication strategy
- Database choice
- ORM or query-layer choice
- Migration tool
- AI provider selection
- Entertainment-provider selection
- Deployment platform
- Production CORS origins
- Production observability strategy

## Recommended Integration Sequence

1. Stabilize the backend application foundation.
2. Add typed configuration.
3. Add safe CORS.
4. Add health endpoint.
5. Add standard success and error contracts.
6. Add backend tests.
7. Add centralized frontend API client.
8. Verify frontend/backend connectivity.
9. Add deterministic mock Vibe generation.
10. Connect Generate Vibe to mock backend data.
11. Add database foundation.
12. Add authentication.
13. Add profile and settings persistence.
14. Add Saved Vibe and history persistence.
15. Add AI-provider abstraction.
16. Integrate selected AI provider.
17. Add entertainment-provider adapters.
18. Run complete integration and security audit.

## Phase 5, Step 5.2 — Backend Application Foundation

Status: Completed

Implemented:

- Established the `backend/app/api/router.py` router-registration boundary.
- Refactored `backend/app/main.py` entry point to use modular routing and configuration without affecting existing endpoints.
- Established `backend/app/core/config.py` for shared application metadata (Project Name, Version, Description).
- Kept the `tests` directory out because no testing framework is installed yet.
- Retained the existing `/` and `/health` endpoints and existing CORS.

Verified backend structure:

```text
backend/
├── .env.example
├── README.md
├── requirements.txt
└── app/
    ├── __init__.py
    ├── main.py
    ├── api/
    │   ├── __init__.py
    │   └── router.py
    └── core/
        ├── __init__.py
        └── config.py
```

Application entry point:

`app.main:app`

Development command:

`uvicorn app.main:app --app-dir backend --reload`

Existing application routes:

- `GET /`
- `GET /health`

Verification:

* Syntax/compile check: Success via `python -m compileall app`
* Lint/static check: Not configured
* Automated tests: Not configured
* Development server: Success (`http://127.0.0.1:8000`)
* Existing route verification: Success (both `/` and `/health` returned 200 OK)
* Unknown-route verification: Success (404 via framework default)

Confirmed not implemented:

* Health endpoint (was preexisting)
* API v1 product routes
* CORS changes
* Environment loading
* Database
* Authentication
* AI integration
* Entertainment-provider integration
* Frontend API integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitations:

* No database, authentication, testing suite, or formal CORS/env loading yet.

## Phase 5, Step 5.3 — Typed Configuration, Environment Validation, and Safe CORS

Status: Completed

Implemented:

- Typed `Settings` class using `pydantic-settings` to load and validate environment variables.
- Environment loading using `.env` parsing built into `pydantic-settings`.
- Strict validation for `APP_ENV` to only allow "development", "test", or "production".
- Custom robust `BeforeValidator` to parse `CORS_ORIGINS` accurately, handling strings, JSON arrays, trailing slashes, and wildcards safely.
- Explicit CORS middleware configuration using the validated `CORS_ORIGINS` setting, without credentials or wildcard matching.
- Used the existing `backend/.env.example` placeholder which contains safe defaults.
- No automated tests added because the verified backend does not have `pytest` configured. Tested manually via Python HTTP scripts.

Settings source:

`backend/app/core/config.py`

Application configuration fields:

`PROJECT_NAME`, `VERSION`, `DESCRIPTION`

Environment variable contract:

- `APP_ENV`: Literal string ('development', 'test', 'production'). Defaults to 'development'.
- `CORS_ORIGINS`: Comma-separated string or JSON array of valid origins. Defaults to `["http://localhost:3000"]`.

Allowed-origin format:

Comma-separated string, e.g., `http://localhost:3000,http://localhost:8080`, or JSON array.

CORS policy:

* Allowed origins: Explicit configured origins only
* Wildcard origins: Disabled (strictly rejected during validation)
* Origin regex: Disabled
* Credentials: Disabled (`allow_credentials=False`)
* Allowed methods: `["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]`
* Allowed headers: `["Content-Type", "Accept"]`

Verification:

* Syntax/compile check: Success via `python -m compileall app`
* Lint/static check: Not configured
* Automated tests: Not configured
* Valid configuration startup: Success
* Invalid environment verification: Success (fast fails with clear `Input should be 'development', 'test' or 'production'` error)
* Invalid origin verification: Success (fast fails with `Origin must start with http or https` or `Trailing slash not allowed`)
* Configured-origin CORS verification: Success (200 OK for OPTIONS, correct `Access-Control-Allow-Origin` header)
* Disallowed-origin CORS verification: Success (400 Bad Request for OPTIONS, no reflection)
* Existing-route verification: Success (root and health routes still accessible)

Confirmed not implemented:

* Health endpoint
* API v1 product routes
* Database
* Authentication
* AI integration
* Entertainment-provider integration
* Frontend API integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitations:

* No database, authentication, or automated testing suite yet.

## Phase 5, Step 5.4 — Health Endpoint and Standard API Contracts

Status: Completed

Implemented:

- Extracted `/health` from `main.py` into a dedicated modular router at `app.api.endpoints.health`.
- Implemented a typed `HealthResponse` schema ensuring exact properties: `status`, `service`, `version`.
- Implemented reusable, typed standard contracts: `SuccessResponse[T]`, `APIErrorResponse`, `APIError`, and `ErrorDetail`.
- Initial stable error codes: `VALIDATION_ERROR`, `NOT_FOUND`, `INTERNAL_SERVER_ERROR`, `HTTP_ERROR`.
- Added global `RequestValidationError` handler, cleanly mapping framework Pydantic validation errors to the standard API error shape.
- Added global `StarletteHTTPException` handler for normalizing `404 Not Found` errors into the standard API error shape.
- Added safe `Exception` fallback for 500s that intercepts the error for standard JSON output without swallowing the internal server-side traceback console print.
- Thoroughly tested schemas via custom Python HTTP scripts against Uvicorn locally.

Health endpoint:

- Method: `GET`
- Path: `/health`
- Status: `200 OK`

Health response:

```json
{
  "status": "ok",
  "service": "vibesync-api",
  "version": "0.1.0"
}
```

Success contract:

```json
{
  "data": {},
  "meta": {}
}
```

Error contract:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be processed.",
    "details": [],
    "request_id": null
  }
}
```

Initial error codes:

* `VALIDATION_ERROR`
* `NOT_FOUND`
* `INTERNAL_SERVER_ERROR`
* `HTTP_ERROR`

Verification:

* Syntax/compile check: Success via `python -m compileall app`
* Lint/static check: Not configured
* Automated tests: Checked natively via python scripts simulating runtime.
* Backend startup: Success
* Health runtime verification: Success (200 OK, JSON precisely matches contract)
* Configured-origin CORS verification: Success
* Disallowed-origin CORS verification: Success
* Unknown-route verification: Success (404 Not Found successfully normalized)

Confirmed not implemented:

* API v1 product routes
* Database
* Authentication
* AI integration
* Entertainment-provider integration
* Frontend API integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitations:

* Request tracing/request IDs not populated since no tracing middleware exists yet.

## Phase 5, Step 5.5 — Backend Testing Foundation

Status: Completed

Test framework:

```text
unittest (Python Standard Library)
```

Test command:

```text
python -m unittest discover tests
```

Test structure:

```text
backend/
└── tests/
    ├── __init__.py
    ├── helpers.py
    ├── test_app.py
    ├── test_config.py
    ├── test_contracts.py
    ├── test_cors.py
    ├── test_errors.py
    └── test_health.py
```

Implemented coverage:

* Application import/construction: Verified
* Configuration defaults: Verified
* Valid environment values: Verified
* Invalid environment values: Verified
* Allowed-origin parsing: Verified
* Invalid-origin rejection: Verified
* Health contract: Verified
* Health stability: Verified
* Success contract: Verified
* Error contract: Verified
* Initial error codes: Verified
* Validation-error normalization: Verified
* Not-found behavior: Verified
* Unexpected-error behavior: Verified
* Configured-origin CORS: Verified
* Disallowed-origin CORS: Verified
* CORS edge cases: Verified
* Route inventory: Verified
* Test isolation: Verified
* Environment cleanup: Verified
* Network independence: Verified
* File-system independence: Verified

Baseline test result:

```text
0 tests collected (No existing test suite)
```

Final test result:

```text
Ran 23 tests in 0.241s (OK)
```

Production defects discovered:

```text
CORS origin validation did not reject origins containing paths, queries, fragments, or credentials.
```

Production fixes:

```text
Updated `validate_origins` in `app/core/config.py` using `urllib.parse.urlparse` to explicitly reject any origin with a path, query, fragment, username, or password.
```

Verification:

* Syntax/compile check: Success
* Lint/static check: Not configured
* Complete test suite: Success (23/23 passed)
* Individual test groups: Success (implied by complete suite isolation)
* Backend startup: Success
* Runtime regression: Success

Confirmed not implemented:

* New application endpoints
* API v1 product routes
* Database
* Authentication
* AI integration
* Entertainment-provider integration
* Frontend API integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitations:

* Relies on native `unittest` and ASGI helpers instead of `pytest` and `httpx`, as testing dependencies are not strictly declared yet.

## Frontend API Client Boundary

Phase 5, Step 5.6 added the frontend API-client foundation.

Current integration status:

- Backend base URL is centralized in frontend configuration.
- Frontend request behavior is centralized.
- Backend standard errors are normalized into an application-owned frontend API error.
- A typed health API module exists.
- No product page or component calls the backend yet.
- Runtime frontend/backend health integration is deferred to Step 5.7.

## Frontend Health Integration

Phase 5, Step 5.7 completed the first runtime frontend/backend integration.

Current integration:

- Frontend calls `GET /health` through the centralized API client.
- Health responses are validated at the frontend trust boundary.
- Configured browser-origin CORS was verified.
- Frontend provides checking, connected, unavailable, and manual retry states.
- No product API is connected.
- No authentication, database, AI, or provider integration was added.

## Phase 5, Step 5.8 — Versioned API Router and Initial Product Contract

Status: Completed

API version:

- Prefix: `/api/v1`
- Prefix source: `backend/app/api/router.py`
- Versioned router: `backend/app/api/router.py`

Application routes:

- `GET /health`
- `POST /api/v1/vibes/generate`

Vibe request contract:

```json
{
  "mood": "chill",
  "context": "relaxing"
}
```

Supported moods:

* `chill`
* `happy`
* `energetic`
* `focus`
* `romantic`
* `low`

Context behavior:

* Optional: Yes
* Trimming: Yes, leading/trailing whitespace is removed.
* Whitespace-only behavior: Converted to null/absent.
* Maximum length: 500 characters
* Unknown-field behavior: Ignored (default Pydantic behavior)

Generated Vibe response contract:

```json
{
  "data": {
    "id": "vibe-1",
    "title": "Title",
    "mood": "chill",
    "duration": "15-min",
    "description": "desc",
    "intention": "intent",
    "journeySummary": "summary",
    "sections": []
  }
}
```

Recommendation contracts:

* Music: `id`, `title`, `creator`, `description`, `format`, `providerLabel`, `actionLabel`, `artworkVariant`, `tags`, `duration`
* Movie: `id`, `title`, `creator`, `description`, `format`, `providerLabel`, `actionLabel`, `artworkVariant`, `tags`, `duration`
* YouTube: `id`, `title`, `creator`, `description`, `format`, `providerLabel`, `actionLabel`, `artworkVariant`, `tags`, `duration`
* Pinterest: `id`, `title`, `creator`, `description`, `format`, `providerLabel`, `actionLabel`, `artworkVariant`, `tags`, `duration`
* Book: `id`, `title`, `creator`, `description`, `format`, `providerLabel`, `actionLabel`, `artworkVariant`, `tags`, `duration`

Current route behavior:

* Valid request: `501 Not Implemented`
* Error code: `NOT_IMPLEMENTED`
* Message: `Vibe generation is not available yet.`
* Fake recommendation response: No
* AI request: No
* Provider request: No
* Database access: No
* Authentication required: No

Verification:

* Syntax/compile: Passed
* Lint/static: No backend lint or static-check command is currently configured.
* Contract tests: Passed
* Route tests: Passed
* Validation tests: Passed
* Complete backend tests: Passed (37 tests)
* Frontend regression: Passed (Lint)
* Backend startup: Passed
* Valid runtime request: 501 NOT_IMPLEMENTED
* Invalid runtime requests: 422 VALIDATION_ERROR
* Version-boundary verification: 404 NOT_FOUND
* Health regression: 200 OK
* Browser-origin CORS: 501 NOT_IMPLEMENTED for valid origin

Confirmed not implemented:

* AI generation
* Groq
* OpenAI
* Anthropic
* Recommendation generation
* Spotify API
* Netflix API
* YouTube API
* Pinterest API
* Google Books API
* Database
* Authentication
* Frontend product integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitations:

* Vibe generation intentionally returns `501` until the generation service is implemented.

## Phase 5, Step 5.9 — Vibe-Generation Service Boundary

Status: Completed

Dependency direction:

```text
HTTP route
    ↓
Vibe-generation service
    ↓
Future generation/provider boundary
```

Current implementation:

* Route: `backend/app/api/endpoints/vibes.py (generate_vibe)`
* Service: `backend/app/services/vibe_generation.py (VibeGenerationService)`
* Service input: `GenerateVibeRequest`
* Service return annotation: `GeneratedVibeData`
* Dependency-injection approach: `FastAPI Depends`
* Application exception: `VibeGenerationNotImplementedError`
* Exception source: `backend/app/core/exceptions.py`
* Error code: `NOT_IMPLEMENTED`
* Error message: `Vibe generation is not available yet.`
* HTTP mapping: `501`
* Global handler: `vibe_not_implemented_handler`

Current request flow:

```text
Valid request
→ framework validation
→ versioned Vibe route
→ Vibe-generation service
→ application-owned not-implemented exception
→ global exception handler
→ standard 501 API error
```

Invalid request flow:

```text
Invalid request
→ framework validation
→ standard validation error
→ service not called
```

Verification:

* Service unit tests: Passed
* Route delegation tests: Passed
* Invalid-request service-call tests: Passed
* Exception-handler tests: Passed
* Existing contract tests: Passed
* Existing route tests: Passed
* Complete backend suite: Passed (42 tests)
* Frontend regression: Passed (Lint)
* Runtime valid request: 501 NOT_IMPLEMENTED
* Runtime invalid requests: 422 VALIDATION_ERROR
* Runtime health: 200 OK
* Browser-origin CORS: 501 for allowed origin

Public behavior:

* Valid request: `501 Not Implemented`
* Fake recommendation response: No
* AI request: No
* Provider request: No
* Database access: No
* Authentication required: No
* Frontend product integration: No

Confirmed not implemented:

* AI generation
* Prompt runtime
* Groq
* OpenAI
* Anthropic
* LLM adapter
* Provider adapter
* Provider registry
* Recommendation engine
* Spotify API
* Netflix API
* YouTube API
* Pinterest API
* Google Books API
* Database
* Repository layer
* Authentication
* Frontend product integration
* Browser persistence
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitation:

* The service intentionally raises a not-implemented application exception until the real generation boundary is added.

## Phase 5, Step 5.10 — AI-Provider Configuration Boundary

Status: Completed

Configuration source:

- Settings file: `backend/app/core/config.py`
- Settings class: `Settings`
- Environment prefix: `""` (no prefix)
- Environment-file behavior: `.env` loaded via `SettingsConfigDict`
- Settings cache/factory: global `settings` instance

AI configuration:

- Enabled field: `AI_ENABLED`
- Default enabled value: `false`
- Provider field: `AI_PROVIDER`
- Provider value: `groq`
- API-key field: `GROQ_API_KEY`
- API-key type: `SecretStr`
- API-key behavior while disabled: Optional
- API-key behavior while enabled: Required
- Model field: `GROQ_MODEL`
- Model behavior: defaults to `llama3-8b-8192`, validated when AI enabled
- Timeout field: Not added
- Output-token field: Not added

Validation:

```text
AI disabled + no API key
→ valid configuration

AI enabled + no API key
→ safe configuration-validation failure

AI enabled + placeholder test key
→ valid configuration
```

Secret handling:

* Real key committed: No
* Real key documented: No
* Real key logged: No
* Real key returned by API: No
* `.env.example` uses placeholder: Yes
* Real `.env` ignored: Yes (verified in `.gitignore`)
* Secret-aware type/redaction: Yes (`SecretStr` masks value in representation)

Current runtime behavior:

* Groq SDK: Not installed
* Groq client: Not implemented
* AI request: Not implemented
* Prompt runtime: Not implemented
* Provider adapter: Not implemented
* Recommendation generation: Not implemented
* Product route: Still returns standard `501`
* Health behavior: Unchanged
* Frontend behavior: Unchanged

Verification:

* Settings default tests: Passed
* AI-disabled tests: Passed
* AI-enabled missing-key tests: Passed
* Placeholder-key tests: Passed
* Provider tests: Passed
* Model tests: Passed
* Secret-handling tests: Passed
* Complete backend suite: Passed (45 tests)
* Frontend regression: Passed
* Normal startup: Passed
* Missing-key safe failure: Passed
* Placeholder configuration: Passed
* Runtime health: 200 OK
* Runtime product route: 501 NOT_IMPLEMENTED
* Browser-origin CORS: 501 for allowed origin
* Secret audit: No secrets found

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Dependency file modified: No
* Lockfile modified: No

Known limitation:

* AI configuration exists, but no AI client or network integration is implemented.

## Phase 5, Step 5.11 — Groq Client Boundary

Status: Completed

Integration approach:

- Approach: B
- Reason: The official Groq SDK provides reliable typing and configuration out of the box, reducing boilerplate and risk of manual HTTP client bugs.
- Groq SDK: added
- Groq SDK version: 1.5.0
- Dependency file: backend/requirements.txt
- Lockfile: None (requirements.txt only)
- Dependency impact: Added groq and its transitive dependencies (anyio, httpx, distro, sniffio, etc.)

Client boundary:

- Client source: backend/app/integrations/ai/groq_client.py
- Construction function: create_groq_client
- Settings input: app.core.config.Settings
- Client output: groq.AsyncGroq
- Construction behavior: Explicit and lazy
- Import-time construction: No
- Startup construction: No
- Health-request construction: No
- Vibe-request construction: No
- Direct environment read: No
- Raw secret access location: inside create_groq_client
- Completion boundary: not added

Safety:

- Live Groq request: No
- Real API key used: No
- Real API key committed: No
- API key logged: No
- API key returned by API: No
- Prompt runtime: No
- AI-response parsing: No
- Recommendation generation: No
- Vibe service integration: No

Verification:

- Client-construction tests: Passed
- Secret-isolation tests: Passed
- Lazy-initialization tests: Passed
- Existing AI-settings tests: Passed
- Complete backend suite: Passed (51 tests)
- Frontend regression: Passed (Build)
- Backend startup: Passed
- Runtime health: 200 OK
- Runtime product route: 501 Not Implemented
- Browser-origin CORS: Allowed origin works
- Network audit: No live request
- Prompt audit: No prompt building
- Secret audit: No secrets exposed

Current public behavior:

- GET /health: Unchanged
- POST /api/v1/vibes/generate: Standard 501 Not Implemented
- Groq client connected to service: No
- AI generation available: No

Known limitation:

- The Groq client boundary exists, but no prompt, completion request, response parsing, or Vibe-generation integration is implemented.

## Phase 5, Step 5.12 — Vibe Prompt and Structured AI-Output Contract

Status: Completed

Internal AI-output contract:

- Contract source: ackend/app/integrations/ai/contracts.py
- Root model: StructuredVibeAIOutput
- Validation framework: Pydantic 2
- Provider-neutral: Yes
- Required categories: music, movie, youtube, pinterest, ook
- Recommendation count: 1 per category
- Extra root fields: Forbidden by default in Pydantic schema
- Extra nested fields: Forbidden by default
- Public compatibility: Verified
- Production mapper: Not added (test-only construction for now)

Prompt boundary:

- Prompt source: ackend/app/integrations/ai/prompts/vibe.py
- Prompt version: 1
- System-prompt constant: VIBE_SYSTEM_PROMPT
- Builder: uild_vibe_messages
- Builder input: GenerateVibeRequest
- Builder output: list[ChatMessage]
- Message count: 2
- Roles: system, user
- Missing-context representation: <none>
- Context treated as untrusted: Yes
- Prompt-injection boundary: Yes
- JSON-only instruction: Yes
- Exact output shape included: Yes
- Provider-neutral messages: Yes
- Deterministic construction: Yes

Safety:

- Hidden-instruction disclosure requested: No
- Chain-of-thought requested: No
- Secret included: No
- API key included: No
- Unsafe recommendation guard: Yes
- Self-harm encouragement prohibited: Yes
- Dangerous instructions prohibited: Yes
- Explicit sexual content prohibited: Yes
- Professional medical/legal/financial claims restricted: Yes

Current integration status:

- Groq client construction: No
- Groq request: No
- Model invocation: No
- AI-response parsing: No
- Recommendation generation: No
- Vibe-service integration: No
- Route integration: No
- Product route: Still standard 501
- Health behavior: Unchanged
- Frontend behavior: Unchanged

Verification:

- Internal-contract tests: Success
- Prompt-builder tests: Success
- Prompt-injection boundary tests: Success
- Public-compatibility tests: Success
- No-client-construction tests: Success
- Complete backend suite: Success
- Frontend regression: Pre-existing TS errors as expected, linting ok
- Backend startup: Success
- Runtime health: Success
- Runtime product route: Success
- Browser-origin CORS: Success
- Network audit: Success
- Response-parsing audit: Success
- Secret audit: Success

Dependencies:

- Package installed: No
- Package upgraded: No
- Package removed: No
- Dependency file modified: No
- Lockfile modified: No

Known limitation:

- The prompt and structured AI-output contract exist, but no model request, AI-response parsing, recommendation generation, or Vibe-service integration is implemented.
- Prompt-injection tests verify message-boundary protections only; they do not prove complete resistance to all prompt-injection attacks.

## Phase 5, Step 5.13 — Mocked Groq Completion and Structured-Response Parser Boundary

Status: Completed

Groq SDK inspection:

- SDK version: 1.5.0
- Async client type: AsyncGroq
- Completion method: client.chat.completions.create
- Message input: list[dict] (roles and content)
- JSON response mode: supported and used
- Timeout argument: 	imeout keyword argument
- Output-token argument: max_tokens keyword argument
- Response content path: 
esponse.choices[0].message.content
- Provider exception types: groq.GroqError

Completion boundary:

- Source: ackend/app/integrations/ai/groq_completion.py
- Function: 
equest_structured_vibe_completion
- Async: Yes
- Client input: AsyncGroq
- Message input: Sequence[ChatMessage]
- Model input: str
- Timeout input: Optional[float]
- Output-token input: Optional[int]
- Creates client: No
- Reads environment: No
- Builds prompt: No
- Parses JSON: No
- SDK calls per invocation: 1
- Returns: Non-empty raw message content
- Retry: No
- Streaming: No
- Tool calling: No
- Provider fallback: No

Structured-response parser:

- Source: ackend/app/integrations/ai/parser.py
- Function: parse_structured_vibe_output
- Input: str
- Output: StructuredVibeAIOutput
- JSON behavior: Strict
- Empty response: Rejected
- Invalid JSON: Rejected
- Prose-wrapped JSON: Rejected
- Markdown-fenced JSON: Rejected
- Contract validation: Existing internal model
- Response repair: No
- JSON extraction: No
- Partial result: No

Internal AI errors:

- Source: ackend/app/integrations/ai/exceptions.py
- Base error: AIExecutionError
- Completion error: AICompletionError
- Empty-response error: AIEmptyResponseError
- Parse error: AIResponseParseError
- Validation error: AIResponseValidationError
- Raw provider output exposed: No
- Prompt exposed: No
- User context exposed: No
- API key exposed: No
- HTTP coupling: No

Current integration status:

- Live Groq request: No
- Real API key used: No
- Vibe-service integration: No
- Route integration: No
- Frontend integration: No
- Recommendation generation: No
- Product route: Still standard 501
- Health behavior: Unchanged
- Frontend behavior: Unchanged

Verification:

- Completion-success tests: Passed
- Empty-response tests: Passed
- Provider-exception tests: Passed
- Parser-success tests: Passed
- Invalid-JSON tests: Passed
- Contract-validation tests: Passed
- Isolated mocked boundary test: Passed
- Existing prompt tests: Passed
- Existing client tests: Passed
- Complete backend suite: Passed
- Frontend regression: Expected TS errors, lint OK
- Backend startup: Passed
- Runtime health: Passed
- Runtime product route: Passed
- Browser-origin CORS: Passed
- Network audit: Passed
- Retry/repair audit: Passed
- Secret/output-leakage audit: Passed

Dependencies:

- Package installed: No
- Package upgraded: No
- Package removed: No
- Dependency file modified: No
- Lockfile modified: No

Known limitation:

- Completion execution is verified only with mocks/fakes.
- No live provider request has been made.
- The completion and parser boundaries remain disconnected from the Vibe-generation service and public route.
- Invalid provider output fails strictly; no repair, extraction, retry, or partial result is implemented.

## Phase 5, Step 5.14 — Integrate AI Generation into the Vibe Service

Status: Completed

The Vibe generation service now strictly integrates the existing isolated AI boundaries. The route is still completely untouched.

Integration constraints preserved:
- Existing `GenerateVibeRequest` input used.
- Existing `GeneratedVibeData` output contract used.
- Typed AI settings utilized natively.
- Prompt builder called appropriately.
- Groq client instantiated lazily and securely inside the service flow using `create_groq_client`.
- Async structured completion correctly processed.
- Strict parser invoked properly.
- All errors gracefully mapped and safe.

Pure mapping:
- A new pure mapper function `map_ai_output_to_vibe_data` successfully transitions the internal `StructuredVibeAIOutput` object into the public `GeneratedVibeData` schema.

Verification:
- The `generate_with_ai` service method is fully unit tested using mocked endpoints.
- No live Groq API calls were made during the test.
- The standard `generate` method, which is invoked by the `POST /api/v1/vibes/generate` route, still correctly raises `VibeGenerationNotImplementedError()` producing a `501 Not Implemented` response.
- `GET /health` continues to return a healthy check.

## Phase 5, Step 5.15 — Connect the Vibe API Route to the AI Service

Status: Completed

The Vibe API route (`POST /api/v1/vibes/generate`) has been connected to the new `generate_with_ai` service method.

API Integration details:
- Validated request passes through directly to the service layer.
- Existing standard API models (`SuccessResponse`, `APIErrorResponse`) remain the interface layer.
- New exception handlers were introduced in `app/core/exceptions.py` to map internal AI execution errors safely to API errors:
  - `AIClientConfigurationError` → `503 Service Unavailable` (`AI_UNAVAILABLE`)
  - `AIExecutionError` (and subclasses) → `502 Bad Gateway` (`AI_GENERATION_FAILED`)
- Standard error envelope correctly wraps all service errors, stripping internal stack traces, API keys, or raw provider outputs.
- Focused mocked route tests verify these responses seamlessly. 

The route still requires AI features to be manually enabled and API keys properly provisioned before it executes live requests.
