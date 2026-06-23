# Vesta Code Conventions

This skill documents the conventions and best practices for the Vesta project. Follow these rules when writing code.

## React & Next.js

### Server Components by Default
- All components are Server Components unless they need interactivity (state, effects, event handlers)
- Add `"use client"` only when necessary — not for hooks that are server-compatible
- Prefer passing data as props from server to client rather than fetching on the client

### Data Fetching: SWR over useEffect
- Use **SWR** for client-side data fetching: `useSWR('/api/data', fetcher)`
- Never use `useEffect` for data fetching
- SWR handles caching, revalidation, deduplication, and error/loading states
- Use `mutate()` for optimistic updates after mutations

### Server Actions for Mutations
- Use Next.js Server Actions for create/update/delete operations
- Server Actions run on the server, reducing client JS and improving security
- Invalidates SWR cache via `mutate()` after completion

### State Management
- **Zustand** for client-side UI state (modals, panels, sidebar, filters)
- **SWR** for server/API state (data from backend)
- Keep stores small and focused; split into multiple stores rather than one large store
- Avoid putting derived data in stores — compute it instead

### Forms: react-hook-form + zod
- Every form uses `react-hook-form` with `@hookform/resolvers/zod`
- Define a zod schema per form and derive the TypeScript type:
  ```ts
  const formSchema = z.object({ email: z.string().email() })
  type FormValues = z.infer<typeof formSchema>
  ```
- Use `<FormField>` with shadcn form components for consistent UI
- Server Actions receive and validate the same zod schema on the server

### Avoid Re-renders
- Don't memoize prematurely (`useMemo`, `useCallback`, `React.memo`)
- Add memoization only when profiling shows a re-render bottleneck
- Prefer splitting components over memoization
- Lift state up only when truly shared; colocate state otherwise

### Avoid useEffect
- Data fetching → SWR
- Subscriptions → zustand `.subscribe()` or `useSyncExternalStore`
- Syncing state → lift state or derive it
- If you think you need `useEffect`, pause and reconsider the architecture

## Styling

### Tailwind CSS v4
- Use Tailwind utility classes exclusively; no CSS modules or styled-components
- Use `@apply` only in `@layer base` for global resets — never in component files

### Design Tokens
- Use Geist theme tokens via CSS variables: `bg-background`, `text-foreground`, `border-border`
- Use Geist typography utilities: `text-heading-24`, `text-label-14`, `text-copy-16`, `text-button-14`
- Use Geist radius: `rounded-sm` (6px), `rounded-md` (12px), `rounded-lg` (16px)

### cn() Utility
- Always use `cn()` for conditional class merging in components
- Always put `className` as the last prop that accepts dynamic classes
- Component signature: `function Foo({ className, ...props }: ComponentProps)`

## Performance

### Code Splitting
- Use `next/dynamic` for heavy client components that are below the fold
- Wrap dynamic imports with `<Suspense>` and a fallback
- Example: `const HeavyChart = dynamic(() => import("./heavy-chart"), { ssr: false })`

### Images
- Use `next/image` for all images; configure remote patterns in `next.config.ts`
- Provide explicit `width` and `height` to prevent layout shift

### Fonts
- Use `next/font` for all custom fonts; fonts are already configured in `app/layout.tsx` (Geist Sans, Geist Mono)

## File Structure

### Feature-based Grouping
- Group files by feature, not by type:
  ```
  app/dashboard/
    page.tsx
    dashboard-chart.tsx
    dashboard-table.tsx
  ```
- NOT:
  ```
  components/dashboard-page.tsx
  components/dashboard-chart.tsx
  ```
- Shared UI components go in `components/ui/`
- Shared hooks go in `hooks/`
- Shared utilities go in `lib/`

### Naming
- Files: `kebab-case.tsx` for components, `kebab-case.ts` for utilities
- Components: PascalCase (`UserProfile`, `DataTable`)
- Functions: camelCase (`formatDate`, `calculateTotal`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS_PER_PAGE`)

## Dependencies

| Library | Purpose |
|---------|---------|
| swr | Server state fetching + cache |
| zustand | Client UI state |
| react-hook-form + zod | Form state + validation |
| axios | HTTP client |
| motion | Animations |
| next-themes | Theme toggle (light/dark) |

## Additional Notes

- No `any` types — use `unknown` and narrow with guards
- Prefer `interface` over `type` for public APIs, `type` for unions and intersections
- Use `const` over `let` — if a variable shouldn't be reassigned, make it `const`
- Avoid default exports — prefer named exports for better tree-shaking and refactoring
