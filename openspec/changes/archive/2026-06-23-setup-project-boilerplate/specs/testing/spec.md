## ADDED Requirements

### Requirement: Vitest test runner
The system SHALL provide a Vitest test runner configured with React Testing Library and jsdom environment.

#### Scenario: Test command executes
- **WHEN** a developer runs `pnpm test`
- **THEN** Vitest SHALL execute all test files matching `**/*.test.{ts,tsx}` and report results

#### Scenario: Component renders correctly
- **WHEN** a component test renders a React component
- **THEN** the component SHALL render in a simulated browser environment (jsdom) with DOM assertions available via Testing Library

#### Scenario: TypeScript test files are supported
- **WHEN** a test file uses TypeScript syntax
- **THEN** Vitest SHALL process it without additional transpilation configuration

### Requirement: Pre-commit test execution
The system SHALL run tests related to staged files before every commit.

#### Scenario: Tests pass commit proceeds
- **WHEN** a developer stages changes and runs `git commit`
- **THEN** tests related to the staged files SHALL pass before the commit completes

#### Scenario: Tests fail commit aborts
- **WHEN** a developer stages changes with failing related tests
- **THEN** the commit SHALL be aborted and failing test output SHALL be displayed

### Requirement: Test setup with DOM matchers
The system SHALL provide Jest DOM matchers for readable test assertions.

#### Scenario: DOM matchers are available
- **WHEN** a test imports from `@testing-library/jest-dom`
- **THEN** extended matchers like `toBeInTheDocument()`, `toHaveClass()`, `toHaveTextContent()` SHALL be available globally
