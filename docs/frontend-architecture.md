# VibeSync AI — Frontend Architecture

## Document Status

Status: Planned

Phase: Phase 4 — Real Product Interface Implementation

Current step: Step 4.1 — Route and Layout Architecture

## Purpose

This document defines the route structure, layout boundaries, navigation model, responsive behavior, theme boundaries, accessibility expectations, and implementation order for the real VibeSync AI frontend.

## Route-Group Strategy

The proposed Next.js App Router structure:

```text
frontend/src/app/
├── layout.tsx
├── globals.css
├── page.tsx
│
├── (marketing)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── how-it-works/
│   │   └── page.tsx
│   └── privacy/
│       └── page.tsx
│
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
│
├── (app)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── generate/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── vibe/
│   │   └── [vibeId]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   ├── saved/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── history/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
├── design-system/
│   └── existing internal preview routes
│
├── not-found.tsx
└── error.tsx
```

### Migration Plan (Duplicate Root Route Prevention)

Next.js cannot simultaneously use `frontend/src/app/page.tsx` and `frontend/src/app/(marketing)/page.tsx` for the same `/` route.

1. Keep the current temporary setup page unchanged during Step 4.1.
2. In the future landing-page implementation step:
   * Replace the temporary root setup page with the real marketing landing page.
   * Use `(marketing)/layout.tsx` only if it can be introduced without a duplicate `/` route.
3. Do not create a duplicate root route.
4. Preserve backend verification through development documentation or a future internal health route before replacing the temporary page.

## Public Route Map

| Route           | Purpose                                | Layout           | Phase 4 status |
| --------------- | -------------------------------------- | ---------------- | -------------- |
| `/`             | Premium VibeSync landing page          | Marketing layout | Planned        |
| `/about`        | Product story and entertainment vision | Marketing layout | Planned        |
| `/how-it-works` | Explain mood-to-entertainment flow     | Marketing layout | Planned        |
| `/privacy`      | Privacy information                    | Marketing layout | Planned        |
| `/login`        | User login interface                   | Auth layout      | Planned        |
| `/signup`       | User signup interface                  | Auth layout      | Planned        |

* Marketing pages share a premium public header and footer.
* Login and signup use a focused authentication layout.
* Public pages do not use the dashboard sidebar.
* Authentication is visual-only initially unless a later backend-auth step explicitly implements it.

## Application Route Map

| Route            | Purpose                            | Primary interface                                                |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------- |
| `/dashboard`     | Personalized entertainment home    | Mood greeting, quick Generate Vibe CTA, recent and saved content |
| `/generate`      | Main mood-driven generation flow   | Mood, time, content preferences, generation action               |
| `/vibe/[vibeId]` | Generated entertainment experience | Rich Spotify, Netflix, YouTube, Pinterest, and book sections     |
| `/saved`         | Saved Vibe collections             | Saved Vibe cards, filters, empty state                           |
| `/history`       | Previous generated experiences     | Timeline or grouped history                                      |
| `/profile`       | User identity and preferences      | Profile information and entertainment preferences                |
| `/settings`      | Application settings               | Theme, accessibility, notifications, privacy                     |

* These are product-interface routes planned as protected routes.
* Real protection must not be claimed until authentication exists.
* Early UI implementation may use fictional local preview data clearly isolated from real API data.

#### `vibe/`
*Provides the generated Vibe experience interface components.*
- `vibe-experience.data.ts`: Static dataset demonstrating a full 5-section Vibe.
- `vibe-experience-hero.tsx`: Premium hero displaying the generated intent.
- `vibe-journey-overview.tsx`: Static 5-step journey summary.
- `vibe-media-section.tsx`: Semantic container for categorized provider recommendations.
- `vibe-recommendation-card.tsx`: Fictionalized media card with abstract generated artwork.
- `vibe-artwork.tsx`: Abstract CSS/SVG visual generator component.
- `vibe-prototype-feedback.tsx`: Accessible local status region for prototype interactions.
- `vibe-experience-client.tsx`: Client wrapper managing action interactions securely.
- `vibe-generic-state.tsx`: Safe fallback state for unavailable prototype data.

#### `marketing/` Layout

Future responsibilities of `frontend/src/app/(marketing)/layout.tsx`:
* Premium VibeSync public background
* Shared marketing header & footer
* Skip-to-content link & Main-content landmark
* Responsive public navigation
* Mobile navigation trigger
* Sign In & Get Started actions
* No dashboard sidebar or mobile bottom navigation

Planned shared components (do not create yet):
```text
frontend/src/components/marketing/
├── marketing-header.tsx
├── marketing-mobile-menu.tsx
├── marketing-footer.tsx
└── marketing-shell.tsx
```

## Authentication Layout

Future responsibilities of `frontend/src/app/(auth)/layout.tsx`:
* Focused authentication experience
* VibeSync brand link
* Optional visual entertainment panel on desktop
* Centered form surface
* Mobile-safe spacing
* Accessible main landmark
* No dashboard sidebar or mobile bottom navigation
* Link back to landing page

Planned shared components (do not create yet):
```text
frontend/src/components/auth/
├── auth-shell.tsx
├── auth-brand-panel.tsx
└── auth-form-panel.tsx
```

## Application Layout

Future responsibilities of `frontend/src/app/(app)/layout.tsx` (reusing existing UI components):
* Shared dashboard application shell
* Desktop sidebar & Mobile bottom navigation
* Responsive topbar & Main content container
* Mood-theme scope
* Future authentication boundary, user context boundary, and notification surface

Do not implement logic for Auth checks, Middleware, User fetching, Database access, or Global mood persistence at this stage.

## Real Dashboard Navigation

### Primary
* Dashboard → `/dashboard`
* Generate Vibe → `/generate`
* Saved Vibes → `/saved`
* History → `/history`

### Secondary
* Profile → `/profile`
* Settings → `/settings`

Desktop: Show all primary and secondary destinations in the sidebar. Show brand identity in the header and profile near the footer.
Mobile: Use a maximum of five visible bottom-navigation destinations (Home, Generate, Saved, History, Profile). Settings remains contextual.

## Active Navigation Behavior

* Active navigation will be derived from the current pathname in a future implementation step.
* Exact route matching: `/dashboard`, `/generate`, `/saved`, `/history`, `/profile`, `/settings`.
* Nested matching: `/vibe/[vibeId]` prefers a neutral page-header back action. Avoid complex active-state logic initially.
* Accessibility: Active items use `aria-current="page"`. Active state is not communicated by color alone.

## Dashboard Shell Structure

```text
MoodThemeProvider
└── AppShell
    ├── Sidebar
    │   ├── SidebarHeader
    │   ├── SidebarContent
    │   │   ├── Primary navigation
    │   │   └── Secondary navigation
    │   └── SidebarFooter
    │
    ├── Topbar
    │   ├── Mobile brand
    │   ├── Current page context
    │   └── Profile or future actions
    │
    ├── Main content
    │   ├── PageHeader
    │   ├── Page-specific content
    │   └── Page-specific feedback states
    │
    └── MobileNav
```

* Mood theme affects the application-shell subtree, not marketing/auth pages. Initial dashboard uses the default theme.

## Mood Theme Boundaries

* **Marketing**: Uses the default VibeSync brand theme.
* **Authentication**: Uses the default VibeSync brand theme (may use decorative artwork).
* **Dashboard**: Wrapped in `MoodThemeProvider`, starts default.
* **Generated Vibe Detail**: May use a `MoodThemeScope` based on the Vibe mood without unexpectedly overwriting the app.

## Page-Level UI Responsibilities

### Landing Page
* Premium hero, Entertainment media collage, Mood-first value proposition
* “Build My Vibe” & “See How It Works” CTAs
* Provider category preview, How it works, Rich recommendation-card showcase

### Login & Signup
* Form inputs (Email, Password, Name), Remember me, Forgot password
* Actions, Google visual placeholder (if no real API), Links between auth states

### Dashboard
* Personalized greeting (fictional data), Current mood prompt, Generate Vibe CTA, Time choices
* Recent Vibes, Saved Vibes preview, Entertainment discovery, Empty/Loading states

### Generate Vibe
* Mood selection, Time selection (15m, 30m, 1h, All night)
* Content preferences (Music, Movies, YouTube, Pinterest, Books), Optional text prompt
* Generate action, Accessible progress feedback

### Vibe Detail
* Rich media sections (Spotify, Netflix, YouTube, Pinterest, Books) using rich cards.
* Contains Artwork, Title, Creator/Author, Reason, Duration, Provider label, Primary external action (e.g. Open in Spotify, Watch on Netflix).

## Time-Aware Recommendation Rules

* **15 Minutes**: Prioritize Music, Short YouTube, Pinterest, Short reading. Avoid full movies.
* **30 Minutes**: Prioritize Music, Medium YouTube, Pinterest, Reading session. Movies only as "save for later".
* **1 Hour**: Prioritize Music, Longer YouTube, One TV episode, Short docs, Reading, Pinterest.
* **All Night**: Allow Full movies, Multiple episodes, Long playlists, Extended reading.

*(Rules are future recommendations and not implemented in Step 4.1)*

## Rich Media Card Requirements

Future recommendation cards must reuse `MediaCard`, `MediaArtwork`, `Badge`, `Button`.
Must support Provider label, Media type, Artwork, Title, Metadata, Reason, Duration, Mood match, Save/External actions.
Do not use copyrighted provider logos or artwork yet. Use text labels and original local placeholder artwork.

## Loading, Empty, Error, and Skeleton States

* **Loading**: Use Skeleton, MediaCardSkeleton. Avoid blank screens.
* **Empty**: Use EmptyState (No saved Vibes, history, recommendations). Provide useful actions.
* **Error**: Use ErrorState for failed loads. Provide retry/safe navigation actions.
* **Progress**: Use Spinner, Progress, Accessible status text.

## Route Loading and Error Boundaries

Use route-level `loading.tsx` and `error.tsx` (client component) for `/dashboard`, `/generate`, `/vibe/[vibeId]`, `/saved`, `/history`. Use `not-found.tsx` for missing Vibe detail.

## Responsive Behavior

* **Mobile (320–767 px)**: Single-column layouts, mobile bottom nav, full-width actions, touch-friendly.
* **Tablet (768–1023 px)**: Adaptive grid, Sidebar breakpoint active, Cards may use two-column layouts.
* **Desktop (1024 px+)**: Persistent sidebar, multi-column sections, media grids, maximum content width.

## Accessibility Requirements

* Skip-to-content support
* Semantic landmarks, One logical `<h1>`, Logical heading order
* Visible focus indicators, Keyboard-accessible controls, Native form controls & labels
* `aria-current`, Accessible feedback, Reduced-motion support
* No essential info via hover only, No status meaning via color only

## External Link Behavior

Future provider actions use real URLs only when trusted. Open in new tab with `target="_blank" rel="noopener noreferrer"`. Use descriptive labels (e.g., "Open Song Title in Spotify").

## Preview Data Architecture

Planned location (do not create yet):
```text
frontend/src/data/
├── dashboard-preview.ts
├── vibe-preview.ts
└── profile-preview.ts
```
Data must be fictional, typed, isolated from components, and contain no secrets.

## Future Frontend Type Architecture

Planned location (do not create yet):
```text
frontend/src/types/
├── navigation.ts
├── entertainment.ts
├── vibe.ts
└── user.ts
```
(Do not duplicate `MoodTheme`).

## Product Component Architecture

Planned directories (do not create yet):
```text
frontend/src/components/
├── marketing/
├── auth/
├── app-shell/
├── dashboard/
├── generate/
├── vibe/
├── saved/
├── history/
├── profile/
└── settings/
```

## Server and Client Component Boundaries

* **Server**: Static page structure, Route-level composition, Future server-side data loading.
* **Client**: Interactive sections (Mood/Time selection, Filters, Tabs, Modal/Drawer triggers, Form state, Theme switching, optimistic UI). Keep client boundaries narrow.

## Phase 4 Implementation Order

```text
Step 4.1 — Plan route and layout architecture
Step 4.2 — Create real route groups and shared layout foundations
Step 4.3 — Build the premium marketing header and footer
Step 4.4 — Build the real VibeSync landing page
Step 4.5 — Build the shared authentication layout
Step 4.6 — Build the signup interface
Step 4.7 — Build the login interface
Step 4.8 — Build the real dashboard application shell
Step 4.9 — Build the dashboard overview interface
Step 4.10 — Build the Generate Vibe interface
Step 4.11 — Build the generated Vibe detail interface
Step 4.12 — Build the Saved Vibes interface
Step 4.13 — Build the History interface
Step 4.14 — Build the Profile interface
Step 4.15 — Build the Settings interface
Step 4.16 — Complete Phase 4 responsive, accessibility, visual, and Git verification
```

## Visual Fidelity Rules

Preserve: Premium entertainment-startup feeling, Midnight graphite foundation, Indigo-violet identity, Rich media presentation, Ambient layered backgrounds, Large confident typography, Spacious layouts, Mood-adaptive atmosphere.
Avoid: Generic admin dashboard look, Excessive glassmorphism/neon, Link-only results, Inconsistent cards.

## “$20,000 Startup Quality” Standards

Means: Clear identity, Premium hierarchy, Strong responsive/accessible design, Real loading/empty states, Rich media presentation, Polished micro-interactions, No horizontal overflow or console errors.
Does not mean: Glowing everywhere, Copyrighted assets without permission, Fake API claims.

## Phase 4, Step 4.3 — Premium Marketing Header and Footer

Status: Implemented

Implemented:

- Original reusable VibeSync brand component
- Shared marketing navigation configuration
- Sticky premium marketing header
- Desktop public navigation
- Active-route navigation behavior
- Sign In action
- Get Started action
- Accessible mobile-navigation trigger
- Drawer-based marketing mobile menu
- Mobile-menu focus management
- Mobile-menu focus return
- Mobile-menu body-scroll restoration
- Shared marketing footer
- Shared marketing shell
- Responsive marketing chrome
- Keyboard-accessible public navigation
- Reduced-motion-compatible navigation behavior

Current root-page strategy:

- The existing `/` setup-verification page remains unchanged.
- Marketing header and footer are currently applied to `/about`, `/how-it-works`, and `/privacy`.
- The real `/` landing page will receive marketing chrome when the temporary setup page is replaced in Phase 4, Step 4.4.

Not implemented yet:

- Final landing-page hero
- Entertainment collage
- Provider-category showcase
- How-it-works landing section
- Adaptive mood landing section
- Rich recommendation-card showcase
- Testimonials
- Landing-page final CTA
- Final signup interface
- Final login interface
- Real dashboard application shell

## Phase 4, Step 4.4 — Premium VibeSync Landing Page

Status: Implemented

Implemented:

- Real VibeSync root landing page
- Root marketing header integration
- Root marketing footer integration
- Landing-page skip link
- Semantic landing-page main landmark
- Premium hero
- Original entertainment collage
- Entertainment-category strip
- How VibeSync Works section
- Time-aware entertainment section
- Adaptive mood showcase
- Rich recommendation-card showcase
- Fictional concept-preview social proof
- Final landing CTA
- Original local or CSS-generated entertainment artwork
- Responsive landing behavior
- Keyboard-accessible landing actions
- Reduced-motion-compatible decorative behavior

Root-route migration:

- The temporary frontend-to-backend setup-verification page was replaced by the real VibeSync landing page.
- The frontend-to-backend verification procedure remains documented.
- Backend code and backend integration remain unchanged.
- No duplicate `(marketing)/page.tsx` route was created.

Not implemented yet:

- Final signup interface
- Final login interface
- Authentication
- Real dashboard application shell
- Dashboard overview
- Generate Vibe interface
- Generated Vibe detail interface
- Saved Vibes interface
- History interface
- Profile interface
- Settings interface
- Recommendation logic
- Provider integrations

## Phase 4, Step 4.5 — Shared Authentication Layout

Status: Implemented

Implemented:

- Shared AuthShell
- Shared AuthBrandPanel
- Shared AuthFormPanel
- Original AuthVisualUniverse
- Premium split-screen desktop authentication layout
- Focused mobile authentication layout
- Tablet-responsive authentication behavior
- Shared VibeSync auth branding
- Shared back-to-home navigation
- Auth skip-link preservation
- Auth main-landmark preservation
- Decorative artwork accessibility
- Reduced-motion-compatible auth visuals

Preserved:

- Existing login placeholder
- Existing signup placeholder
- Existing landing page
- Existing marketing routes
- Existing application routes
- Existing design-system routes
- Existing backend integration

Not implemented yet:

- Signup form
- Login form
- Form validation
- Form submission
- Authentication state
- Google authentication
- Backend authentication
- Route protection
- Final login interface

## Phase 4, Step 4.6 — Premium Signup Interface

Status: Implemented

Implemented:

- Real `/signup` interface
- SignupForm
- Full-name field
- Email field
- Password field
- Confirm-password field
- Independent password-visibility controls
- Live password-requirement guidance
- Terms and privacy agreement
- Client-side signup validation
- Touched-field validation behavior
- Accessible inline errors
- Validation-summary alert
- First-invalid-field focus
- Local loading-state preview
- Local prototype success preview
- Success-state focus management
- Login cross-link
- Responsive signup behavior
- Keyboard-accessible signup behavior

Prototype-only behavior:

- No account is created.
- No signup information is sent.
- No signup information is stored.
- No backend endpoint is called.
- No automatic redirect occurs.

Not implemented yet:

- Real user registration
- Backend authentication
- Database user creation
- Password hashing
- JWT
- Cookies
- Sessions
- Google authentication
- Email verification
- Route protection
- Final login interface

## Phase 4, Step 4.7 — Premium Login Interface

Status: Implemented

Implemented:

- Real `/login` interface
- LoginForm
- Email field
- Password field
- Password-visibility control
- Local remember-me control
- Remember-me prototype disclosure
- Forgot-password prototype disclosure
- Client-side login validation
- Touched-field validation behavior
- Accessible inline errors
- Validation-summary alert
- First-invalid-field focus
- Local loading-state preview
- Local prototype sign-in success preview
- Success-state focus management
- Signup cross-link
- Responsive login behavior
- Keyboard-accessible login behavior

Prototype-only behavior:

- Credentials are not verified.
- No session is created.
- No login information is sent.
- No login information is stored.
- Remember-me state is not stored.
- No password-reset email is sent.
- Dashboard navigation opens the current prototype without authentication.

Not implemented yet:

- Real authentication
- Backend login
- Database lookup
- Password verification
- Password reset
- Email sending
- JWT
- Access tokens
- Refresh tokens
- Cookies
- Sessions
- Google authentication
- Route protection

## Phase 4, Step 4.8 — Real Dashboard Application Shell

Status: Implemented

Implemented:

- Shared AppShell
- Desktop AppSidebar
- Responsive AppMobileNavigation
- Shared AppTopBar
- Shared active-route AppNavigation
- Shared AppUserMenu
- Shared AppPageContainer
- Shared AppPageHeader
- Original application navigation icons
- Primary application navigation
- Secondary application navigation
- Active-route visual and semantic state
- Prototype workspace disclosure
- Responsive application layout
- Keyboard-accessible mobile navigation
- Keyboard-accessible prototype user menu
- Application skip-link preservation
- Application main-landmark preservation
- Reduced-motion-compatible shell behavior

Prototype-only behavior:

- Authentication is not connected.
- Personalized account data is not loaded.
- User-menu content is fictional prototype content.
- Sign-out behavior is unavailable.

Preserved:

- Dashboard placeholder
- Generate Vibe placeholder
- Saved Vibes placeholder
- History placeholder
- Profile placeholder
- Settings placeholder
- Dynamic Vibe placeholder
- Landing page
- Marketing routes
- Signup interface
- Login interface
- Design-system routes
- Backend integration

Not implemented yet:

- Dashboard overview
- Generate Vibe interface
- Generated Vibe experience
- Saved Vibes content
- History content
- Profile interface
- Settings interface
- Real authentication
- Route protection
- Personalized data




## Phase 4 Architecture Checklist

- [x] Public route map planned
- [x] Authentication route map planned
- [x] Application route map planned
- [x] Marketing layout planned
- [x] Authentication layout planned
- [x] Dashboard application shell planned
- [x] Desktop navigation planned
- [x] Mobile navigation planned
- [x] Mood-theme boundaries planned
- [x] Loading-state strategy planned
- [x] Empty-state strategy planned
- [x] Error-state strategy planned
- [x] Responsive behavior planned
- [x] Accessibility expectations planned
- [x] External-link behavior planned
- [x] Preview-data architecture planned
- [x] Frontend type architecture planned
- [x] Server and Client Component boundaries planned
- [x] Phase 4 implementation order planned

Implementation status:

No Phase 4 product interface has been implemented in Step 4.1.

## Phase 5, Step 5.7 — Frontend/Backend Health Verification

Status: Completed

Health integration:

- Health API source: `frontend/src/lib/api/health.ts`
- Health API function: `getHealth`
- Runtime response validation: `validateHealthResponse` inside `health.ts`
- Health component: `frontend/src/components/app/backend-health-status.tsx`
- Integration location: Sidebar footer in `frontend/src/components/app/app-sidebar.tsx`
- Initial request behavior: Automatically requests `GET /health` once on mount.
- Retry behavior: User-triggered retry is provided when unavailable.
- Cancellation behavior: Automatically aborts pending requests on unmount.
- Mobile behavior: The component is restricted to the desktop sidebar (`hidden lg:flex`). It does not appear in the mobile drawer, preventing clutter in the mobile primary navigation per the Step 15 decision.

Visible states:

- Checking
- Connected
- Unavailable
- Retrying

Verification:

- Frontend lint: Success (0 errors, 0 warnings in API client code).
- Frontend type check: Failed (Pre-existing Phase 4 UI component issues related to `asChild`).
- Frontend tests: Not configured.
- Frontend production build: Failed (Due to pre-existing type-checking issues).
- Backend tests: Success (23/23 OK in 0.160s).
- Direct backend health request: Success (200 OK, returns expected JSON).
- Browser-origin health request: Success (CORS responds correctly).
- Connected-state verification: Confirmed.
- Unavailable-state verification: Confirmed.
- Retry-failure verification: Confirmed.
- Retry-recovery verification: Confirmed.
- Cancellation verification: Confirmed.
- Responsive verification: Confirmed. Fits securely in sidebar footer.
- Keyboard verification: Confirmed. Retry button is focusable.
- Reduced-motion verification: Confirmed.
- Mood-theme verification: Confirmed. Uses CSS variable tokens (`var(--success)`) compatible with all themes.

Confirmed unchanged:

- Landing page
- Login page
- Signup page
- Dashboard content
- Generate Vibe content
- Generated Vibe content
- Saved Vibes content
- Vibe History content
- Profile content
- Settings content
- Mood-to-theme behavior

Confirmed not implemented:

- Product API calls
- Authentication API
- Database
- AI integration
- Entertainment-provider integration
- Browser persistence
- Polling
- Automatic retry
- Analytics
- Notifications
- Uploads
- Payments
- Subscriptions

Dependencies:

- Package installed: No
- Package upgraded: No
- Package removed: No
- Package file modified: No
- Lockfile modified: No

Known limitations:

- Pre-existing type check failures block production build execution.
- Missing frontend testing framework limits unit test coverage.

## Phase 5, Step 5.6 — Centralized Frontend API Client

Status: Completed

API structure:

```text
frontend/src/lib/api/
├── client.ts
├── config.ts
├── errors.ts
├── health.ts
├── index.ts
└── types.ts
```

Backend base URL:

* Environment variable: `NEXT_PUBLIC_API_BASE_URL`
* Safe local example: `http://localhost:8000`
* Configuration source: `frontend/src/lib/api/config.ts`
* Trailing-slash behavior: Removes trailing slashes dynamically
* Invalid URL behavior: Rejects missing values, malformed URLs, queries, fragments, credentials, and non-root paths.

Request client:

* Source: `frontend/src/lib/api/client.ts`
* Transport: Native `fetch`
* Default timeout: 10,000 milliseconds
* Caller cancellation: Supported via `AbortSignal`
* Default headers: `Accept: application/json` and `Content-Type: application/json` where appropriate.
* JSON behavior: Automatically parses standard JSON error/success responses.
* Empty-response behavior: Resolves undefined on HTTP 204 successfully.

Error normalization:

* Typed error source: `frontend/src/lib/api/errors.ts` (ApiError)
* Backend standard errors: Extracts code, safe message, details, and request ID.
* Nonstandard HTTP errors: Fallback `HTTP_ERROR`.
* Network errors: Fallback `NETWORK_ERROR`.
* Timeout errors: Normalizes native timeout aborts to `REQUEST_TIMEOUT`.
* Caller aborts: Normalizes external cancellation to `REQUEST_ABORTED`.
* Invalid JSON: Normalizes parsing failures on success to `INVALID_RESPONSE`.

Current API modules:

* Health: `frontend/src/lib/api/health.ts` exporting `getHealth`

Automated tests:

* Framework: Not configured
* Command: Not configured
* Result: Not configured

Verification:

* Lint: Failed (Pre-existing UI component `asChild` issues)
* Type check: Failed (Pre-existing UI component `asChild` issues)
* Production build: Failed (Due to type-checking step)
* Backend regression tests: Success (23/23 OK in 0.160s)
* Manual API-module verification: Deferred to Step 5.7 due to missing frontend test harness

Confirmed not connected:

* Landing page
* Login
* Signup
* Dashboard
* Generate Vibe
* Generated Vibe
* Saved Vibes
* Vibe History
* Profile
* Settings

Confirmed not implemented:

* Product API modules
* Authentication API
* Tokens
* Cookies
* Browser persistence
* Database
* AI integration
* Entertainment-provider integration
* Analytics
* Notifications
* Uploads
* Payments
* Subscriptions

Dependencies:

* Package installed: No
* Package upgraded: No
* Package removed: No
* Package file modified: No
* Lockfile modified: No

Known limitations:

* Missing frontend automated testing tooling limits safety of changes.
* Type-checking currently fails on pre-existing Phase 4 UI components referencing `asChild`.

## Backend Product Contract Boundary

Phase 5, Step 5.8 added the backend's first versioned product contract.

Current backend product route:

- `POST /api/v1/vibes/generate`

Current frontend status:

- Generate Vibe interface is unchanged.
- Generated Vibe interface is unchanged.
- No frontend product API module exists.
- No frontend product page calls the route.
- Existing frontend/backend health integration remains unchanged.

The product route intentionally returns `501 Not Implemented` until generation is implemented.

## Backend Vibe Service Boundary

Phase 5, Step 5.9 added a backend application-service boundary for future Vibe generation.

Current frontend status:

- Generate Vibe interface is unchanged.
- Generated Vibe interface is unchanged.
- No frontend product API module exists.
- No frontend product request exists.
- Existing health integration remains unchanged.
- Existing mood-driven themes remain unchanged.

Current backend product behavior:

- `POST /api/v1/vibes/generate`
- Valid request: `501 Not Implemented`
- Error code: `NOT_IMPLEMENTED`

The route now delegates to a backend service, but no AI or recommendation generation is implemented.

## Backend AI Configuration Boundary

Phase 5, Step 5.10 added backend-only configuration for the future AI provider.

Current frontend status:

- No AI configuration is exposed to the browser.
- No API key is exposed to the browser.
- No provider selection exists in the frontend.
- No model selection exists in the frontend.
- Generate Vibe interface is unchanged.
- Generated Vibe interface is unchanged.
- No frontend product API request exists.
- Existing health integration remains unchanged.
- Existing mood-driven themes remain unchanged.

Current backend product behavior remains:

- `POST /api/v1/vibes/generate`
- Valid request: `501 Not Implemented`
- Error code: `NOT_IMPLEMENTED`

## Backend Groq Client Boundary

Phase 5, Step 5.11 added an isolated backend Groq client-construction boundary.

Current frontend status:

- No API key is exposed to the browser.
- No AI configuration is exposed to the browser.
- No Groq client exists in the frontend.
- No frontend AI request exists.
- No frontend product API request exists.
- Generate Vibe interface is unchanged.
- Generated Vibe interface is unchanged.
- Existing health integration remains unchanged.
- Existing mood-driven themes remain unchanged.

Current backend product behavior remains:

- POST /api/v1/vibes/generate
- Valid request: 501 Not Implemented
- Groq client connected to Vibe generation: No
