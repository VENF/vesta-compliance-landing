## ADDED Requirements

### Requirement: Automated quality checks on push
The system SHALL run automated quality checks on every push to the main branch.

#### Scenario: Push to main triggers pipeline
- **WHEN** code is pushed to the `main` branch
- **THEN** a CI pipeline SHALL start automatically

#### Scenario: Format check runs
- **WHEN** the CI pipeline runs
- **THEN** Prettier SHALL verify all files match formatting rules (`prettier --check`)

#### Scenario: Lint check runs
- **WHEN** the CI pipeline runs
- **THEN** ESLint SHALL check all files and fail on errors

#### Scenario: TypeScript type check runs
- **WHEN** the CI pipeline runs
- **THEN** `tsc --noEmit` SHALL verify type correctness

#### Scenario: Test suite runs
- **WHEN** the CI pipeline runs
- **THEN** the full Vitest test suite SHALL execute

#### Scenario: Build succeeds
- **WHEN** the CI pipeline runs
- **THEN** `next build` SHALL produce a production build

### Requirement: Automated quality checks on pull requests
The system SHALL run the same quality checks on pull requests targeting main.

#### Scenario: PR to main triggers pipeline
- **WHEN** a pull request is opened or updated targeting `main`
- **THEN** the same CI pipeline SHALL run with format, lint, typecheck, test, and build steps

#### Scenario: Pipeline failure blocks merge
- **WHEN** any CI step fails on a PR
- **THEN** the PR SHALL be blocked from merging until all steps pass

### Requirement: Fast dependency installation
The system SHALL use pnpm with frozen lockfile for reproducible installs.

#### Scenario: CI installs dependencies
- **WHEN** the CI pipeline runs
- **THEN** `pnpm install --frozen-lockfile` SHALL install exact versions from the lockfile
