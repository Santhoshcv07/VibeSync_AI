# Architecture Decisions

Record important technical decisions and their reasons.

---

## ADR-001 — Single Repository

### Status

Accepted

### Decision

Use one repository containing the frontend, backend, documentation, and project notes.

### Reason

A single repository is easier for one developer to manage and keeps related project work synchronized.

### Trade-off

Frontend and backend deployments remain separate even though their source code is stored together.

### Reconsider When

The project grows into multiple independently managed teams or services.

---

## ADR-002 — Next.js Frontend

### Status

Accepted

### Decision

Use Next.js with TypeScript, App Router, Tailwind CSS, and a `src/` directory.

### Reason

This supports a modern, responsive, maintainable frontend with strong routing and production deployment options.

### Trade-off

The project includes both server-component and client-component concepts.

### Reconsider When

A future platform requires a separate native application.

---

## ADR-003 — FastAPI Backend

### Status

Accepted

### Decision

Use Python and FastAPI for the backend API.

### Reason

FastAPI supports typed validation, asynchronous provider integrations, automatic API documentation, and modular AI services.

### Trade-off

Frontend and backend require separate development servers and deployments.

### Reconsider When

A future architecture requires independently scaled services.

---

## ADR-004 — Mock-First Development

### Status

Accepted

### Decision

Build the UI and recommendation flow with mock data before connecting real external providers.

### Reason

This separates UI problems, recommendation problems, and provider-integration problems, making debugging easier.

### Trade-off

Mock data must later be replaced carefully with normalized provider data.

### Reconsider When

Not required for the current MVP.

---

## ADR-005 — Semantic Adaptive Design System

### Status

Accepted

### Decision

Use one semantic design-token system with a stable VibeSync component identity and mood-specific theme values.

### Reason

VibeSync must visually adapt to the user's selected mood while preserving usability, accessibility, component consistency, and brand recognition.

### Trade-off

Mood themes require contrast testing and controlled token changes rather than unrestricted page-specific styling.

### Reconsider When

A future native platform requires a platform-specific visual system.
