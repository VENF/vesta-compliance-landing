## ADDED Requirements

### Requirement: Tariff code display
The system SHALL display the final classified tariff code prominently at the top of the results view.

#### Scenario: Code is shown with AEC and unit
- **WHEN** the results view renders
- **THEN** the tariff code SHALL be displayed in a large, visually distinct box showing: the code (e.g., `8517.13.00.00`), the AEC rate (e.g., `16%`), and the physical unit (e.g., `u`)

#### Scenario: Score and destination shown
- **WHEN** the results view renders
- **THEN** the confidence score and destination country SHALL be displayed below the code

### Requirement: Technical product sheet
The system SHALL display the product technical information from the `technical` field of the result.

#### Scenario: Technical fields are displayed
- **WHEN** the results view renders
- **THEN** the following fields SHALL be shown in a card: Nombre Técnico, Material Constituyente, Función Principal, and Presentación Física

### Requirement: NCM classification path
The system SHALL display the hierarchical classification path from chapter to tariff code.

#### Scenario: Full hierarchy is shown
- **WHEN** the results view renders
- **THEN** the classification path SHALL be displayed as a tree: Capítulo → Partida → Subpartida SA → Subpartida Nacional → Código Arancelario, each with its justification text

#### Scenario: Final position is highlighted
- **WHEN** the hierarchy is displayed
- **THEN** the final tariff code position SHALL be visually distinct (e.g., highlighted or with a pointing arrow)

### Requirement: Legal opinion and justification
The system SHALL display the legal justification from the `verdict.justification` field.

#### Scenario: Legal dictamen is shown
- **WHEN** the results view renders
- **THEN** the legal justification text SHALL be displayed in a styled card

#### Scenario: Discarded candidates are shown
- **WHEN** the results view renders
- **THEN** any discarded candidate codes SHALL be listed with the reason for their rejection

### Requirement: Staggered result reveal
The system SHALL reveal the result sections with staggered animations following transitions-dev conventions.

#### Scenario: Sections animate in sequentially
- **WHEN** the results view renders after the `complete` event
- **THEN** the sections SHALL animate in sequentially with a 200ms stagger delay: code first, then technical sheet, then hierarchy, then legal opinion
