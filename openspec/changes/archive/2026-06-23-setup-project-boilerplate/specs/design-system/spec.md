## ADDED Requirements

### Requirement: Geist design tokens for light theme
The system SHALL define CSS custom properties for the Geist light theme matching `desing/design.md`.

#### Scenario: Light theme applies by default
- **WHEN** the page loads without a dark mode preference
- **THEN** CSS custom properties under `:root` SHALL use Geist light token values

#### Scenario: Background token is white
- **WHEN** inspecting the `--background` CSS variable in light mode
- **THEN** its value SHALL match the Geist `background-100` token (`#ffffff`)

#### Scenario: Foreground token is dark gray
- **WHEN** inspecting the `--foreground` CSS variable in light mode
- **THEN** its value SHALL match the Geist `gray-1000` token (`#171717`)

#### Scenario: Border token is light gray
- **WHEN** inspecting the `--border` CSS variable in light mode
- **THEN** its value SHALL match the Geist `gray-400` token (`#eaeaea`)

#### Scenario: Primary color matches gray-1000
- **WHEN** inspecting the `--primary` CSS variable in light mode
- **THEN** its value SHALL match the Geist `gray-1000` token (`#171717`)

### Requirement: Geist design tokens for dark theme
The system SHALL define CSS custom properties for the Geist dark theme matching `desing/design.dark.md`.

#### Scenario: Dark theme applies with .dark class
- **WHEN** the `<html>` element has the `.dark` class
- **THEN** CSS custom properties under `.dark` SHALL use Geist dark token values

#### Scenario: Background token is black
- **WHEN** inspecting the `--background` CSS variable in dark mode
- **THEN** its value SHALL match the Geist dark `background-100` token (`#000000`)

#### Scenario: Foreground token is light gray
- **WHEN** inspecting the `--foreground` CSS variable in dark mode
- **THEN** its value SHALL match the Geist dark `gray-1000` token (`#ededed`)

### Requirement: Geist typography utilities
The system SHALL provide Tailwind CSS utilities for Geist typography tokens.

#### Scenario: Heading utility classes exist
- **WHEN** using a class like `text-heading-24` or `text-heading-48`
- **THEN** it SHALL apply the corresponding Geist font size, line height, letter spacing, and weight

#### Scenario: Label utility classes exist
- **WHEN** using a class like `text-label-14` or `text-label-16`
- **THEN** it SHALL apply the corresponding Geist label typography values

#### Scenario: Copy utility classes exist
- **WHEN** using a class like `text-copy-16` or `text-copy-14`
- **THEN** it SHALL apply the corresponding Geist copy typography values

### Requirement: Geist spacing scale
The system SHALL provide Tailwind utilities based on the Geist 4px spacing scale.

#### Scenario: Spacing values follow 4px base
- **WHEN** using `p-4`, `gap-6`, `m-8`
- **THEN** the spacing values SHALL follow the Geist scale (4px base: 4=16px, 6=24px, 8=32px)

### Requirement: Geist radius tokens
The system SHALL override shadcn radius tokens with Geist values.

#### Scenario: Small radius is 6px
- **WHEN** inspecting `--radius-sm`
- **THEN** its value SHALL be `6px` matching Geist `rounded.sm`

#### Scenario: Medium radius is 12px
- **WHEN** inspecting `--radius-md`
- **THEN** its value SHALL be `12px` matching Geist `rounded.md`

#### Scenario: Large radius is 16px
- **WHEN** inspecting `--radius-lg`
- **THEN** its value SHALL be `16px` matching Geist `rounded.lg`

### Requirement: shadcn UI core components
The system SHALL provide a set of shadcn UI core components for building interfaces.

#### Scenario: Button component is available
- **WHEN** importing `@/components/ui/button`
- **THEN** the Button component SHALL render with Geist theme styling

#### Scenario: Dialog component is available
- **WHEN** importing `@/components/ui/dialog`
- **THEN** a modal dialog SHALL render with Geist theme styling

#### Scenario: Form component is available
- **WHEN** importing `@/components/ui/form`
- **THEN** Form SHALL integrate with react-hook-form and zod validation

#### Scenario: Toast component is available
- **WHEN** importing `@/components/ui/sonner`
- **THEN** toast notifications SHALL be available with Geist theme styling

### Requirement: Zustand for client state
The system SHALL provide zustand for client-side state management.

#### Scenario: Store is created with zustand
- **WHEN** creating a store with `create()`
- **THEN** the store SHALL provide reactive state without boilerplate

### Requirement: SWR for server state
The system SHALL provide SWR for data fetching with caching and revalidation.

#### Scenario: Data is fetched with SWR
- **WHEN** using `useSWR('/api/data', fetcher)`
- **THEN** data SHALL be fetched, cached, and automatically revalidated

### Requirement: React Hook Form with Zod
The system SHALL provide react-hook-form integrated with zod schemas via @hookform/resolvers.

#### Scenario: Form validates with zod schema
- **WHEN** a form is created with react-hook-form and a zod resolver
- **THEN** validation errors SHALL automatically appear on form fields

### Requirement: Motion for animations
The system SHALL provide the motion library for declarative animations.

#### Scenario: Animated component renders
- **WHEN** using `<motion.div animate={{ opacity: 1 }}>`
- **THEN** the element SHALL animate according to the motion API

### Requirement: Axios for HTTP
The system SHALL provide axios as the HTTP client.

#### Scenario: HTTP request is made
- **WHEN** calling `axios.get('/api/data')`
- **THEN** a Promise-based HTTP request SHALL be made with JSON parsing by default
