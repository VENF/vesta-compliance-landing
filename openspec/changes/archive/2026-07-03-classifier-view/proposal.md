## Why

The project needs a functional feature beyond the boilerplate — a tariff classification tool that lets users upload product CSV files and receive automated legal classification results via SSE streaming. This is the first real vertical slice of the application, validating the hexagonal architecture conventions defined in the project skill.

## What Changes

- Create `/classifier` route with CSV upload form (drag-and-drop dropzone, file validation)
- Create `/classifier/procesar/[id]` route with SSE streaming for processing progress and results
- Implement mock SSE endpoint that emits step-by-step processing events with artificial latency
- Implement hexagonally structured context (`domain/`, `application/`, `infrastructure/`) under `app/classifier/`
- Display processing progress bar, step timeline, and final classification result (tariff code, technical sheet, classification path, legal opinion)
- Use transitions-dev conventions for all UI animations (progress bar, step transitions, result reveal)

## Capabilities

### New Capabilities

- `csv-upload`: CSV file upload form with drag-and-drop, file validation, and upload processing at `/classifier`
- `sse-classification`: Real-time classification progress via SSE streaming at `/classifier/procesar/[id]`, including mock endpoint with step-by-step events and artificial latency
- `classification-results`: Display of calculated classification verdict including tariff code, technical product sheet, NCM classification path hierarchy, and legal justification

### Modified Capabilities

<!-- No existing capabilities are being modified -->

## Impact

- **New routes**: `app/classifier/page.tsx`, `app/classifier/procesar/[id]/page.tsx`
- **New architecture files**: `app/classifier/domain/`, `app/classifier/application/`, `app/classifier/infrastructure/`
- **No new dependencies**: SSE uses built-in `EventSource` and Next.js API routes; motion already installed
- **No breaking changes**: `/` (page.tsx) is preserved; existing components unchanged
