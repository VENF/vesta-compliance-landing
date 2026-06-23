## ADDED Requirements

### Requirement: Conventional commits enforcement
The system SHALL enforce conventional commit format on every commit.

#### Scenario: Valid conventional commit accepted
- **WHEN** a developer runs `git commit -m "feat: add login page"`
- **THEN** the commit SHALL be accepted

#### Scenario: Invalid commit rejected
- **WHEN** a developer runs `git commit -m "fixed stuff"`
- **THEN** the commit SHALL be rejected with a message explaining the required format

#### Scenario: Commit with valid scope accepted
- **WHEN** a developer runs `git commit -m "feat(ui): add button component"`
- **THEN** the commit SHALL be accepted

#### Scenario: Commit with invalid scope rejected
- **WHEN** a developer runs `git commit -m "feat(unknown): something"`
- **THEN** the commit SHALL be rejected if the scope is not in the allowed list

### Requirement: Pre-commit code formatting
The system SHALL auto-format staged files before every commit.

#### Scenario: Staged files are formatted on commit
- **WHEN** a developer stages files with inconsistent formatting and runs `git commit`
- **THEN** the staged files SHALL be formatted with Prettier before the commit completes

#### Scenario: Linting errors block commit
- **WHEN** a developer stages files with ESLint errors and runs `git commit`
- **THEN** the commit SHALL be aborted and linting errors SHALL be reported

#### Scenario: No unformatted files pass through
- **WHEN** a commit succeeds
- **THEN** all committed files SHALL match Prettier formatting rules
