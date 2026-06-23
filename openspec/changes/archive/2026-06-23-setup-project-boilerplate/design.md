## Context

The project is a Next.js 16 application with shadcn (radix-nova style), Tailwind CSS v4, TypeScript, Prettier, and ESLint already configured. It uses pnpm as package manager. A single shadcn component (Button) is installed. The `ThemeProvider` uses `next-themes` with class-based dark mode toggle. Two design token files exist at `desing/design.md` (light) and `desing/design.dark.md` (dark) defining the Geist design system with full color scales, typography, spacing, radius, and component specs.

Currently there are no git hooks, no testing infrastructure, no CI/CD, no state management libraries, and the CSS uses default shadcn oklch tokens instead of the Geist tokens from the design files.

## Goals / Non-Goals

**Goals:**
- Enforce conventional commits via commitlint + husky
- Auto-format and lint on commit via lint-staged
- Run tests on staged files pre-commit
- Provide Vitest + React Testing Library for component/unit tests
- Run quality checks (format, lint, typecheck, test, build) on push/PR via GitHub Actions
- Install shadcn UI core components (~20)
- Map Geist design tokens to CSS custom properties (light + dark)
- Add Tailwind utilities for Geist typography, spacing, radius, shadows
- Install zod, react-hook-form, swr, axios, motion, zustand
- Document React/Next.js best practices in an agent skill

**Non-Goals:**
- Not adding Storybook or visual regression testing
- Not setting up E2E testing (Playwright/Cypress)
- Not adding i18n or routing infrastructure
- Not creating actual application pages or features
- Not modifying the existing page.tsx beyond testing its rendering

## Decisions

### Conventional Commits with commitlint
- **Decision**: Use `@commitlint/config-conventional` with custom scope enum (`ui`, `api`, `hooks`, `lib`, `app`, `config`)
- **Rationale**: Standard angular convention is widely adopted; scopes help organize the monorepo-style app directory
- **Alternatives considered**: Custom commit format — rejected for lack of tooling compatibility

### lint-staged over manual pre-commit hooks
- **Decision**: Use lint-staged to run prettier --write and eslint --fix only on staged files
- **Rationale**: Fast, only touches relevant files, widely used with husky
- **Alternatives considered**: Running full project format/lint — too slow for pre-commit

### Vitest over Jest
- **Decision**: Vitest with @vitejs/plugin-react, jsdom environment
- **Rationale**: Native ESM, faster than Jest, native TypeScript, same ecosystem as Next.js/Vite
- **Alternatives considered**: Jest — slower, requires more configuration, jsdom integration is more complex

### Pre-commit test strategy
- **Decision**: `vitest related --run` to run only tests related to staged files
- **Rationale**: Fast feedback loop; full suite runs in CI
- **Alternatives considered**: Running full test suite — too slow for pre-commit; no test hook — CI catches issues too late

### Geist token mapping approach
- **Decision**: Replace `:root` and `.dark` CSS custom properties in `app/globals.css` with Geist values, keeping the same shadcn variable names (`--background`, `--foreground`, etc.)
- **Rationale**: shadcn components reference these specific variable names; mapping Geist values to existing names avoids modifying component code
- **Details**: Each Geist gray scale step maps to a shadcn semantic variable (e.g., gray-1000 → --foreground, gray-400 → --border, blue-700 → --ring). Typography tokens become `@theme` utilities. Spacing follows 4px base.
- **Alternatives considered**: Creating entirely new CSS variable names — would require modifying every shadcn component, not worth it

### shadcn component selection
- **Decision**: Install ~20 core UI components (button, card, dialog, input, label, form, select, toast, dropdown-menu, popover, tooltip, avatar, badge, checkbox, radio-group, switch, separator, sheet, tabs, textarea, skeleton, table)
- **Rationale**: These cover 90% of typical UI needs without heavy transitive dependencies (e.g., recharts for charts, vaul for drawer)
- **Alternatives considered**: All 60+ components — too many, many require heavy peer deps

### State management: zustand + swr
- **Decision**: Zustand for client-side UI state (modals, toasts, sidebar); SWR for server state (data fetching with cache and revalidation)
- **Rationale**: Each solves a distinct problem without overlap. Zustand is minimal (~1KB). SWR integrates naturally with Next.js App Router.
- **Alternatives considered**: Redux — too much boilerplate; React Query — heavier than SWR for this use case; Context — not performant for frequent updates

## Risks / Trade-offs

- **Commit hook bypass**: Developers can `git commit --no-verify`. Mitigation: CI still enforces formatting/lint/test checks, so bypassing hooks only delays feedback.
- **lit-staged concurrency with husky**: If lint-staged fails mid-commit, the commit is aborted but files may be partially formatted. Mitigation: lint-staged restores original files on failure.
- **Geist token mapping accuracy**: The Geist design uses 10-step color scales with specific semantic meanings (100=bg, 400=border, 1000=text). Misalignment could cause visual inconsistencies. Mitigation: Verify every mapped variable renders correctly in both themes before closing.
- **shadcn breaking changes**: shadcn components can change between versions. Mitigation: Pin shadcn version in package.json, review diffs on upgrade.
- **vitest related --run edge cases**: May miss tests for newly created files with no git history. Mitigation: Full CI suite covers this.
