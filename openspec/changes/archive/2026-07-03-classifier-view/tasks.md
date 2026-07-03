## 1. Domain Layer — Types and Ports

- [ ] 1.1 Create `app/classifier/domain/classification.types.ts` with all TypeScript types/interfaces matching the classification JSON structure (Technical, Candidate, HierarchyItem, Verdict, Step, ProgressEvent, SseEvent)
- [ ] 1.2 Create `app/classifier/domain/classification.repository.ts` with port interface `IClassificationRepository` defining methods: `uploadCsv(file: File) → Promise<{id: string}>`, `connectSse(id: string) → EventSource`

## 2. Infrastructure Layer — Mock Repository + SSE API Route

- [ ] 2.1 Create `app/classifier/infrastructure/MockClassificationRepository.ts` implementing `IClassificationRepository` — `uploadCsv` returns hardcoded id `abc-123`, `connectSse` returns an EventSource connected to the mock API
- [ ] 2.2 Create `app/api/classify/upload/route.ts` — mock POST handler that returns `{ id: "abc-123" }`
- [ ] 2.3 Create `app/api/classify/sse/route.ts` — mock SSE handler that emits step events with artificial delays (variables/500ms → scanning/800ms → analyzing/1200ms → legal/1000ms → complete), interleaved progress events, and the full classification result JSON on complete
- [ ] 2.4 Ensure the mock SSE uses the correct content-type (`text/event-stream`) and cache-control headers

## 3. Application Layer — CSV Upload Page

- [ ] 3.1 Create `app/classifier/application/ProcessCsvUseCase.ts` — orchestrates CSV upload via repository, navigates to result page on success
- [ ] 3.2 Create `app/classifier/application/files/CsvUploadForm.tsx` — drag-and-drop dropzone with file validation (.csv only), file info display, and "Procesar" button
- [ ] 3.3 Create `app/classifier/page.tsx` — thin page wrapper that renders CsvUploadForm
- [ ] 3.4 Add transitions-dev animations to dropzone (drag active state border color change, file selected confirmation)

## 4. Application Layer — SSE Processing + Results Page

- [ ] 4.1 Create `app/classifier/application/ClassificationResultPage.tsx` — client component that manages SSE connection state (loading → processing → complete), delegates to ProcessingStatus or ClassificationResult
- [ ] 4.2 Create `app/classifier/application/files/ProcessingStatus.tsx` — renders the animated progress bar (motion), step timeline with status icons (✓ / ▶ / ○), and ETA text
- [ ] 4.3 Create `app/classifier/application/files/ClassificationResult.tsx` — renders tariff code box, technical sheet card, classification path tree, and legal opinion card
- [ ] 4.4 Create `app/classifier/procesar/[id]/page.tsx` — thin page wrapper that renders ClassificationResultPage
- [ ] 4.5 Add transitions-dev animations: progress bar smooth fill, step status icon transitions, staggered result section reveal (200ms delay between sections)

## 5. Verify Build

- [ ] 5.1 Run `pnpm build` and fix any TypeScript or compilation errors
- [ ] 5.2 Run `pnpm lint` and fix any lint errors
- [ ] 5.3 Manually verify the full flow: navigate to `/classifier`, upload CSV, click Procesar, watch SSE progress, see results
