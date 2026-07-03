## ADDED Requirements

### Requirement: CSV file upload form
The system SHALL provide a drag-and-drop file upload form at `/classifier` for CSV files.

#### Scenario: User sees upload form on page load
- **WHEN** a user navigates to `/classifier`
- **THEN** a file upload area SHALL be displayed with drag-and-drop support and a click-to-browse option

#### Scenario: User uploads valid CSV file
- **WHEN** a user selects or drops a `.csv` file with columns `descripcion_comercial` and `uso_previsto`
- **THEN** the file SHALL appear as selected with its filename and size shown below the dropzone

#### Scenario: User uploads invalid file type
- **WHEN** a user selects a non-CSV file (e.g., `.pdf`, `.png`)
- **THEN** an error message SHALL be displayed and the file SHALL be rejected

#### Scenario: User clicks Procesar with valid file
- **WHEN** a user has selected a valid CSV file and clicks the "Procesar" button
- **THEN** the system SHALL POST the file to `/api/classify/upload` and navigate to `/classifier/procesar/[id]`

#### Scenario: User clicks Procesar without a file
- **WHEN** a user clicks "Procesar" without selecting any file
- **THEN** the button SHALL be disabled and an inline error SHALL prompt the user to select a file first

#### Scenario: Dropzone shows visual feedback on drag
- **WHEN** a user drags a file over the dropzone
- **THEN** the dropzone SHALL visually indicate it is active (e.g., border color change, background tint) following transitions-dev conventions
