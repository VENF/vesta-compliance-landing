## Why

The project was initialized with Next.js and shadcn but lacks the foundational developer tooling, testing infrastructure, CI/CD pipeline, and design system integration needed for a consistent, production-ready development experience. Without these basics, code quality varies, commits are inconsistent, there's no automated testing, and the UI doesn't follow the defined Geist design tokens.

## What Changes

- Configure Husky + commitlint for conventional commit enforcement
- Configure lint-staged for pre-commit formatting (Prettier) and linting (ESLint)
- Set up Vitest + React Testing Library for unit/component testing
- Set up Husky pre-commit hook to run tests on staged files
- Create GitHub Actions CI/CD workflow (lint, typecheck, test, build)
- Install shadcn UI core components (~20)
- Replace default shadcn CSS tokens with Geist design system tokens (light + dark)
- Add Geist typography, spacing, radius, and shadow utilities to Tailwind
- Install and configure: zod, react-hook-form (+ @hookform/resolvers), swr, axios, motion, zustand
- Create a skill with code conventions and best practices for React/Next.js optimization

## Capabilities

### New Capabilities

- `developer-tooling`: Git hooks (husky), conventional commits (commitlint), pre-commit formatting/linting (lint-staged)
- `testing`: Vitest + React Testing Library environment with jsdom, test scripts, pre-commit test execution
- `ci-cd`: GitHub Actions pipeline for automated quality checks on push/PR to main
- `design-system`: Geist design tokens (light + dark variants), shadcn UI core components, typography/spacing/radius utilities

### Modified Capabilities

<!-- No existing capabilities are being modified -->

## Impact

- **Dependencies added**: husky, @commitlint/cli, @commitlint/config-conventional, lint-staged, vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, jsdom, zod, react-hook-form, @hookform/resolvers, swr, axios, motion, zustand
- **New files**: .husky/pre-commit, .husky/commit-msg, commitlint.config.ts, vitest.config.ts, test/setup.ts, .github/workflows/ci.yml, .agents/skills/vesta-conventions/SKILL.md
- **Modified files**: package.json (scripts + lint-staged config), app/globals.css (Geist tokens), .gitignore (add coverage/ if needed)
- **Process changes**: All commits must follow conventional commit format; pre-commit hooks enforce formatting, linting, and tests
