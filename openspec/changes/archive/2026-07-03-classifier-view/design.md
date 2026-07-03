## Context

The project has boilerplate infrastructure (Next.js 16, shadcn UI, motion, zustand, SWR) and a defined hexagonal architecture convention with vertical slicing. The `app/` directory currently has only the demo page at `/`. The skill mandates hexagonal structure (`domain/`, `application/`, `infrastructure/` per context), transitions-dev for UI animations, and dependency inversion.

This is the first feature — a tariff classification tool. The backend is entirely mocked (SSE endpoint with artificial latency, CSV POST returning a job ID).

## Goals / Non-Goals

**Goals:**
- Create `/classifier` route with CSV upload (drag-and-drop dropzone, file type validation)
- Create `/classifier/procesar/[id]` route consuming a mock SSE stream
- Display processing progress with step timeline and animated progress bar
- Display final classification result: code, technical sheet, NCM path, legal opinion
- Follow hexagonal architecture: `domain/` (types + port), `application/` (use cases + components), `infrastructure/` (mock repo + SSE)
- Follow transitions-dev conventions for all animations
- Mock backend: POST returns `{ id }`, SSE emits step events with artificial latency

**Non-Goals:**
- Not connecting to a real backend API (entirely mock-based)
- Not handling multi-row CSV processing (only first row processed)
- Not persisting results to localStorage or any storage
- Not adding E2E tests for this feature

## Decisions

### Hexagonal structure within App Router
- **Decision**: The context lives at `app/classifier/` with `domain/`, `application/`, `infrastructure/` subdirectories. The page files at `app/classifier/page.tsx` and `app/classifier/procesar/[id]/page.tsx` are thin wrappers that delegate to components in `application/files/`.
- **Rationale**: Follows the project conventions. Domain layer is pure TypeScript with no React imports. Application layer contains components and use cases. Infrastructure contains the mock repository and SSE logic.
- **Alternatives considered**: Flat structure in `app/` — rejected because it violates hexagonal conventions and would mix concerns.

### Mock SSE via API Route
- **Decision**: A Next.js API route at `app/api/classify/sse/route.ts` handles the SSE connection. It emits events with configurable delays (500-1200ms per step) and returns the mock classification data on completion.
- **Rationale**: Using a real API route (even if mocked) keeps the client code production-ready — swapping to a real backend only changes the repository implementation.
- **Details**: The mock uses `ReadableStream` to push SSE events. Each step has a fixed delay and emits `event: step` with step data, plus `event: progress` with percentage and ETA. Final event is `event: complete` with the full result JSON.
- **Alternatives considered**: Client-only mock with `setTimeout` — simpler but wouldn't use SSE pattern, making the real backend swap harder.

### Progress calculation
- **Decision**: Progress percentage and ETA are computed server-side in the mock, sent as SSE events. The client only renders what it receives.
- **Rationale**: Keeps the client dumb and the mock realistic. The mock tracks total steps (4 processing steps + 1 complete), calculates percent per step, and estimates ETA based on remaining steps × average step duration.
- **Alternatives considered**: Client-side progress calc based on step count — less realistic, doesn't test the SSE data path.

### Navigation after CSV upload
- **Decision**: POST to `/api/classify/upload` (mock) returns `{ id }`. The client navigates to `/classifier/procesar/[id]` using `next/navigation`.
- **Rationale**: Standard POST → redirect pattern. The ID could be a UUID or hash; mock uses a hardcoded ID.

### UI animation approach
- **Decision**: Use motion (framer-motion) for:
  - Progress bar width animation (smooth transition between percentages)
  - Step status icon changes (checkmark fade-in, spinner rotation)
  - Results reveal with staggered fade-in per section
- **Rationale**: motion is already installed. Follows transitions-dev conventions for timing (150ms state changes, 200ms reveals, 300ms overlays).
- **Alternatives considered**: CSS transitions only — less expressive for staggered reveals and icon morphing.

## Risks / Trade-offs

- **Mock backend divergence**: The mock SSE uses hardcoded delays and data. When swapping to real backend, event format might differ. Mitigation: Define the SSE event types in `domain/` as a contract — both mock and real implement the same interface.
- **Single-row CSV processing**: The mock only processes the first row. If the MVP later requires multi-row processing, the progression view needs redesign. Mitigation: Design the UI to handle multiple products (e.g., a list of completed items on the left).
- **No error handling in mock**: The mock always succeeds. Error states (network failure, invalid CSV) are not tested yet. Mitigation: Add a `fail` event type in SSE spec so error paths can be mocked later.
