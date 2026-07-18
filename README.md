# VibeSync AI

> Your mood. Your time. Your universe.

VibeSync AI is an AI-powered entertainment discovery platform that creates personalized Vibe sessions using a user's mood, activity, available time, energy level, preferences, and feedback.

A generated Vibe may include:

- Music recommendations
- YouTube recommendations
- Visual moodboards
- Time-aware movie recommendations
- Book recommendations

## Project Status

🚧 Active development — Phase 2: Repository and Development Setup

## Planned Architecture

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Python, FastAPI
- Database: PostgreSQL
- AI: Provider-independent LLM integration
- Recommendation system: Deterministic rules, weighted scoring, feedback, and diversity controls

## Repository Structure

```text
VibeSync-AI/
├── frontend/
├── backend/
├── docs/
├── notes/
├── .gitignore
└── README.md
```

## Development Approach

The project is being developed incrementally:

Plan → Build → Run → Test → Verify → Document → Commit

## Current Architecture Status

Frontend:

- Phase 4 frontend checkpoint complete
- Landing, authentication interfaces, AppShell, Dashboard, Generate Vibe, Generated Vibe, Saved Vibes, Vibe History, Profile, and Settings implemented as frontend prototypes

Backend:

- Existing backend inspected
- Backend implementation status documented in `docs/backend-architecture.md`
- Phase 5 integration architecture planned
- No new backend feature implemented in Step 5.1

## Frontend/Backend Integration Status

Phase 5, Step 5.7 completed.

Current runtime integration:

- Frontend health check through the centralized API client
- Runtime validation of the backend health response
- Compact backend connection status
- Manual retry when the backend is unavailable
- Safe cancellation during unmount
- Verified browser-origin CORS

Current integration is limited to

- `GET /health`

Product APIs are not connected yet.
- Provider integrations are not connected
- Database persistence is not connected
- Authentication is not connected

## Backend Foundation Status

Phase 5, Step 5.2 completed.

Current backend foundation:

- Verified framework-native application entry point
- Clear application registration structure
- Clear router-registration boundary
- Import-safe application foundation
- Existing routes preserved
- Backend starts using the verified development command

Not connected:

- Health endpoint (product boundary)
- Frontend API client
- Product APIs
- Database
- Authentication
- Health endpoint (product boundary)
- Frontend API client
- Product APIs
- Database
- Authentication
- AI generation
- Entertainment-provider APIs

## Backend API Status

Phase 5, Step 5.4 completed.

Available application endpoint:

- `GET /health`

Current backend contracts:

- Typed health response
- Reusable success-response contract
- Reusable API error contract
- Stable initial error codes
- Safe not-found behavior
- Validation-error normalization where supported

## Backend Testing Status

Phase 5, Step 5.5 completed.

Current backend test coverage includes:

- Application construction and route registration
- Typed configuration and environment validation
- Allowed-origin validation
- Health endpoint contract
- Standard success and error contracts
- Validation-error behavior
- Safe not-found behavior
- Restrictive CORS behavior
- Test isolation and environment cleanup

The backend test suite runs without:

- A database
- Authentication
- AI-provider credentials
- Entertainment-provider credentials
- External network access
- A real `.env` file

## Frontend API Client Status

Phase 5, Step 5.6 completed.

Current frontend API foundation:

- Centralized backend base URL
- Shared native request client
- Typed backend contracts
- Typed frontend API errors
- Standard backend-error normalization
- Network, timeout, cancellation, and invalid-response handling
- Typed health API module

Not connected to product interfaces:

- Landing
- Authentication interfaces
- Dashboard
- Generate Vibe
- Generated Vibe
- Saved Vibes
- Vibe History
- Profile
- Settings

## Technology Stack Configuration

Safe environment-variable templates are available at:

- `frontend/.env.example`
- `backend/.env.example`

These files contain placeholders only. Real environment files and credentials must remain local and must never be committed to Git.

## Frontend-to-Backend Verification

The temporary root setup-verification page was replaced by the real VibeSync landing page in Phase 4, Step 4.4.

To verify the backend independently:

1. Start the backend using the documented backend command: `uvicorn app.main:app --app-dir backend --reload`
2. Open the existing backend health endpoint or API documentation route (e.g. `http://localhost:8000/api/v1/health` or `http://localhost:8000/docs`).
3. Confirm the expected healthy response.
4. Start the frontend: `npm run dev`
5. Confirm the VibeSync landing page loads successfully.

The backend integration remains preserved. Only the temporary visual verification page was replaced.

## Versioned Product API Status

Phase 5, Step 5.8 completed.

Current application endpoints:

- `GET /health`
- `POST /api/v1/vibes/generate`

The Vibe-generation endpoint currently validates the request contract and returns:

- Status: `501 Not Implemented`
- Error code: `NOT_IMPLEMENTED`

Typed contracts now exist for:

- Supported moods
- Vibe-generation requests
- Generated Vibe responses
- Music recommendations
- Movie recommendations
- YouTube recommendations
- Pinterest recommendations
- Book recommendations

AI generation and frontend product integration are not implemented yet.

## Vibe-Generation Service Status

Phase 5, Step 5.9 completed.

Current request flow:

```text
POST /api/v1/vibes/generate
→ request validation
→ Vibe-generation service
→ application-owned not-implemented exception
→ standard 501 API error
```

Current behavior:

* Valid request: `501 Not Implemented`
* Error code: `NOT_IMPLEMENTED`
* Fake recommendation response: No
* AI generation: Not implemented
* Provider integration: Not implemented
* Database: Not implemented
* Authentication: Not implemented
* Frontend product integration: Not implemented

## AI Configuration Status

Phase 5, Step 5.10 completed.

Backend AI configuration now supports:

- AI disabled by default
- Typed provider configuration
- Optional API key while AI is disabled
- Required API key when AI is enabled
- Typed model configuration
- Safe secret handling
- Placeholder-only environment documentation

Current implementation does not include:

- Groq SDK
- Groq client
- AI network requests
- Prompt runtime
- Recommendation generation
- Frontend AI configuration

The Vibe-generation route still intentionally returns `501 Not Implemented`.

## Groq Client Status

Phase 5, Step 5.11 completed.

Current backend AI foundation:

- Typed AI configuration
- AI disabled by default
- Isolated Groq client-construction boundary
- Explicit lazy client construction
- Secret access isolated to the construction boundary
- Mocked client tests
- No live network request

Not implemented yet:

- Prompt construction
- Groq completion request
- AI-response parsing
- Recommendation generation
- Vibe-service integration
- Frontend product integration

The Vibe-generation route still intentionally returns 501 Not Implemented.

## Vibe Prompt and Structured AI Output

Phase 5, Step 5.12 completed.

Current backend AI foundation includes:

- Typed AI configuration
- Isolated Groq client boundary
- Versioned Vibe system prompt
- Typed provider-neutral chat messages
- Deterministic prompt construction
- Untrusted user-context boundary
- Internal structured AI-output contract
- Public-contract compatibility tests

Not implemented yet:

- Groq completion request
- AI-response parsing
- Recommendation generation
- Vibe-service integration
- Frontend product integration

The Vibe-generation route still intentionally returns 501 Not Implemented.

## Mocked Groq Completion and Structured Parsing

Phase 5, Step 5.13 completed.

Current backend AI foundation includes:

- Typed AI configuration
- Isolated Groq client boundary
- Versioned Vibe prompt
- Provider-neutral chat messages
- Internal structured AI-output contract
- Isolated asynchronous Groq completion boundary
- Strict JSON response parser
- Safe internal AI errors
- Mocked completion tests
- Strict contract-validation tests

Not implemented yet:

- Live Groq verification
- Vibe-service integration
- Public recommendation generation
- Frontend product integration
- Retry or response repair

The Vibe-generation route still intentionally returns 501 Not Implemented.
