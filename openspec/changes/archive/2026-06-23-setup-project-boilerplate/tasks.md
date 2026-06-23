## 1. Developer Tooling — Husky + commitlint + lint-staged

- [x] 1.1 Install husky, @commitlint/cli, @commitlint/config-conventional, lint-staged
- [x] 1.2 Initialize husky (`npx husky init`)
- [x] 1.3 Create `commitlint.config.ts` with `@commitlint/config-conventional` and scope enum (`ui`, `api`, `hooks`, `lib`, `app`, `config`)
- [x] 1.4 Configure husky `pre-commit` hook to run `npx lint-staged`
- [x] 1.5 Configure husky `commit-msg` hook to run `npx --no -- commitlint --edit $1`
- [x] 1.6 Add `lint-staged` config in `package.json` (formats staged `*.{ts,tsx}` with prettier --write + eslint --fix)
- [x] 1.7 Add `"prepare": "husky"` script and `"format:check"` script to `package.json`

## 2. Testing — Vitest + React Testing Library

- [x] 2.1 Install vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, jsdom
- [x] 2.2 Create `vitest.config.ts` with react plugin, jsdom environment, globals: true, and `@/` path alias
- [x] 2.3 Create `test/setup.ts` with `@testing-library/jest-dom` import
- [x] 2.4 Add `"test"` and `"test:watch"` scripts to `package.json`
- [x] 2.5 Update husky `pre-commit` hook to also run `pnpm vitest related --run` after lint-staged
- [x] 2.6 Add `coverage/` to `.gitignore`

## 3. CI/CD — GitHub Actions

- [x] 3.1 Create `.github/workflows/ci.yml` with triggers on push and pull_request to main
- [x] 3.2 Add job with steps: checkout, pnpm setup, node setup, frozen-lockfile install
- [x] 3.3 Add format:check, lint, typecheck, test, build steps to the workflow

## 4. Design System — Geist Theme Tokens

- [x] 4.1 Map Geist light tokens from `desing/design.md` to `:root` CSS custom properties in `app/globals.css` (--background, --foreground, --primary, --secondary, --muted, --border, --input, --ring, --card, --popover, chart colors)
- [x] 4.2 Map Geist dark tokens from `desing/design.dark.md` to `.dark` CSS custom properties in `app/globals.css`
- [x] 4.3 Add Geist typography utilities as `@theme` blocks in `app/globals.css` (heading-*, label-*, copy-*, button-*)
- [x] 4.4 Add Geist spacing scale, radius tokens, and shadow utilities as `@theme` blocks
- [x] 4.5 Verify light theme renders correctly (background, text, button, borders)
- [x] 4.6 Verify dark theme renders correctly (same checks with .dark class)
- [x] 4.7 Ensure focus ring uses Geist blue-700 for light and blue-900 for dark

## 5. UI Components — shadcn Core

- [x] 5.1 Install core shadcn components: `npx shadcn add button card dialog input label form select sonner dropdown-menu popover tooltip avatar badge checkbox radio-group switch separator sheet tabs textarea skeleton table`
- [x] 5.2 Verify all installed components render without errors
- [x] 5.3 Verify components use Geist theme tokens (colors, radius, typography)

## 6. Project Libraries — Install and Configure

- [x] 6.1 Install zod, react-hook-form, @hookform/resolvers with `pnpm add`
- [x] 6.2 Install swr, axios, motion, zustand with `pnpm add`
- [x] 6.3 Verify imports work for all packages (quick smoke test)

## 7. Code Conventions — Agent Skill

- [x] 7.1 Create `.agents/skills/vesta-conventions/SKILL.md` with React/Next.js best practices
- [x] 7.2 Document Server Components by default rule
- [x] 7.3 Document SWR for data fetching (avoid useEffect)
- [x] 7.4 Document zustand for client state, react-hook-form + zod for forms
- [x] 7.5 Document Tailwind v4 + cn() + Geist tokens for styling
- [x] 7.6 Document performance patterns (lazy loading, Suspense, dynamic imports, memoization only when measured)
- [x] 7.7 Document file structure convention (feature-based grouping)
