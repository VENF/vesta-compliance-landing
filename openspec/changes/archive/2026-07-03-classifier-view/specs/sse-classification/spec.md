## ADDED Requirements

### Requirement: SSE streaming classification progress
The system SHALL establish an SSE connection on navigating to `/classifier/procesar/[id]` and display real-time processing progress.

#### Scenario: Page establishes SSE on mount
- **WHEN** a user navigates to `/classifier/procesar/abc-123`
- **THEN** the page SHALL connect to `/api/classify/sse?id=abc-123` via `EventSource`

#### Scenario: Step events update the progress timeline
- **WHEN** the SSE emits a `step` event with `{ stepId: "variables", status: "ok" }`
- **THEN** the step "Identificando variables críticas" SHALL show a checkmark icon (✓) and "OK" status

#### Scenario: Running step shows animated indicator
- **WHEN** the SSE emits a `step` event with `{ stepId: "analyzing", status: "running" }`
- **THEN** that step SHALL show a pulsing/running indicator (▶) and "CORRIENDO" or animated ellipsis

#### Scenario: Pending step shows waiting indicator
- **WHEN** steps exist that have not yet received a `step` event
- **THEN** those steps SHALL show a waiting indicator (○) and "ESPERA"

#### Scenario: Progress bar updates with percent
- **WHEN** the SSE emits a `progress` event with `{ percent: 40, eta: "27s aprox." }`
- **THEN** the progress bar SHALL animate smoothly to 40% and display the ETA text

#### Scenario: SSE connection closes on complete
- **WHEN** the SSE emits a `complete` event
- **THEN** the `EventSource` SHALL be closed and the processing view SHALL transition to the results view

### Requirement: Mock SSE endpoint with artificial latency
The system SHALL provide a mock SSE endpoint at `/api/classify/sse` that emits events with artificial delays.

#### Scenario: Mock emits all steps sequentially
- **WHEN** a client connects to `/api/classify/sse`
- **THEN** the mock SHALL emit step events in order: variables → scanning → analyzing → legal → complete
- **AND** each step SHALL have a delay between 500ms and 1200ms

#### Scenario: Progress events interleaved with steps
- **WHEN** steps are being emitted
- **THEN** `progress` events SHALL be interleaved, showing increasing percentage and estimated time remaining

#### Scenario: Final complete event contains full result
- **WHEN** all steps are done
- **THEN** a `complete` event SHALL be emitted with the full classification result JSON including `technical`, `candidates`, `verdict`, and `hierarchy` data
