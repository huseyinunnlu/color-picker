# GitHub Copilot Instructions

## Project Overview

2to255 is a color shade generation tool that helps developers and designers to:

- Generate color shades from any input color format (HEX, RGB, RGBA)
- Display a comprehensive list of shades from darkest to lightest
- Copy color values in different formats
- Preview color shades in real-time
- Supports multiple color input formats for better user experience

### Key Features

- Color input support for multiple formats
- Real-time color shade generation
- Color format conversion utilities
- One-click copy functionality
- Responsive color shade display
- Accessible color information

## Color Types and Utilities

```typescript
// Color format types
type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

// Color input type
type ColorInput = HexColor | RGBColor | RGBAColor;

// Color value interface
interface ColorValue {
  hex: HexColor;
  rgb: RGBColor;
  rgba: RGBAColor;
  shade: number; // 0-255
}

// Color conversion utilities
interface ColorUtils {
  hexToRgb: (hex: HexColor) => RGBColor;
  rgbToHex: (rgb: RGBColor) => HexColor;
  generateShades: (color: ColorInput) => ColorValue[];
}
```

## Language Guidelines

- Use English for all code, comments, and documentation
- Keep naming conventions in English
- Use clear and descriptive English terms for variables, functions, and components
- Document all public APIs in English
- Use proper technical English terms

## Project Tech Stack

- React with TypeScript
- Tanstack Router for type-safe routing
- Tailwind CSS
- shadcn/ui
- Lucide React Icons
- Yarn for package management (use yarn commands for all package operations)

### Package Management

- Use Yarn for all package operations
- Install dependencies with `yarn add`
- Install dev dependencies with `yarn add -D`
- Remove packages with `yarn remove`
- Install all dependencies with `yarn install`
- Run scripts with `yarn run` or `yarn` shorthand

## Best Practices & Conventions

### Naming Conventions

- Use descriptive English names for all identifiers
- Follow English grammar for verb-noun combinations in method names
- Use standard English technical terms

```typescript
// Good examples
const fetchUserData = () => {};
interface UserProfile {}
const handleSubmit = (e: FormEvent) => {};

// Avoid non-English terms
// Don't use: const veriGetir = () => { }
```

### Component Structure

- Use functional components with TypeScript interfaces
- Implement proper component composition
- Follow atomic design principles

```typescript
// Example component structure
interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children }) => {
  // Implementation
};
```

### TypeScript Guidelines

- Always define proper interfaces/types
- Use strict type checking
- Avoid `any` type
- Utilize discriminated unions for complex states
- Use generics when appropriate

### Styling Conventions

- Use Tailwind's utility classes
- Follow consistent className ordering
- Utilize shadcn/ui components as base
- Extend components using Tailwind's merge utility

```typescript
// Example styling
import { cn } from "@/lib/utils";

const className = cn("base-styles", variant === "primary" && "primary-styles", className);
```

### Routing Conventions

- Define routes in `src/routes/definitions` directory
- Use code-based routing with Tanstack Router
- Implement proper route organization
- Follow Tanstack Router patterns for layouts and nested routes

```typescript
// Example route definition
// routes/definitions/users.route.ts
import { RootRoute, Route } from "@tanstack/react-router";

import { UserDetailsRoute } from "../components/UserDetailsRoute";
import { UsersIndexRoute } from "../components/UsersIndexRoute";

export const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "users",
  component: UsersLayout,
});

export const usersIndexRoute = new Route({
  getParentRoute: () => usersRoute,
  path: "/",
  component: UsersIndexRoute,
});

export const userDetailsRoute = new Route({
  getParentRoute: () => usersRoute,
  path: "$userId",
  component: UserDetailsRoute,
});
```

## Component File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── index.tsx     # Main component file
│   │   └── types.ts      # Component-specific types
│   └── Card/
│       ├── index.tsx
│       └── types.ts
```

### Component Structure Guidelines

- Each component must be in its own directory
- Use `index.tsx` for the main component file
- Use `types.ts` for component-specific types
- Export components using `export default function`

```typescript
// Example component structure:

// ComponentName/types.ts
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

// ComponentName/index.tsx
import { ComponentNameProps } from './types';

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <div>
      <h1>{prop1}</h1>
      {prop2 && <p>Optional value: {prop2}</p>}
    </div>
  );
}
```

### File Organization

```
src/
├── components/        # Only shared/common components
│   ├── ui/           # shadcn components
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   └── common/       # other shared components
├── routes/
│   ├── definitions/  # Route definitions
│   │   ├── root.route.ts
│   │   └── users.route.ts
│   ├── components/   # Route components
│   │   ├── UsersLayout/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   ├── UsersIndexRoute/
│   │   │   ├── index.tsx
│   │   │   └── types.ts
│   │   └── UserDetailsRoute/
│   │       ├── index.tsx
│   │       └── types.ts
│   └── router.ts     # Router configuration
├── hooks/            # shared hooks
├── lib/             # utilities
└── types/           # shared types
```

### Component Organization Guidelines

- Place shared components in `src/components/`
- Place route-specific components in `routes/[route-name]/components/`
- Components used only in a specific route should be in that route's components directory
- Follow the same component structure guidelines for both shared and route-specific components

```typescript
// Example route-specific component structure:
// routes/users/components/UserCard/types.ts
interface UserCardProps {
  user: User;
}

// routes/users/components/UserCard/index.tsx
import { UserCardProps } from './types';

export default function UserCard({ user }: UserCardProps) {
  return (
    // Implementation
  );
}
```

### Route Organization Guidelines

- Place route definitions in `routes/definitions/`
- Group related routes in a single definition file
- Place route components in `routes/components/`
- Keep routing logic separate from component logic

```typescript
// Example router configuration
// routes/router.ts
import { Router } from "@tanstack/react-router";

import { rootRoute } from "./definitions/root.route";
import { userDetailsRoute, usersIndexRoute, usersRoute } from "./definitions/users.route";

const routeTree = rootRoute.addChildren([
  usersRoute.addChildren([usersIndexRoute, userDetailsRoute]),
]);

export const router = new Router({ routeTree });
```

### Component Rules

1. Always create a separate directory for each component
2. Always separate types into `types.ts`
3. Use default exports in `index.tsx`
4. Keep component-specific logic within the component directory

### Code Generation Hints

- Start component files with interface definitions
- Use JSDoc comments for complex logic
- Include example usage in comments
- Specify all props in interface definitions

### Performance Considerations

- Implement proper memo usage
- Use proper React hooks dependencies
- Lazy load components when needed
- Implement proper state management

### Icon Usage (Lucide React)

```typescript
// Example icon import and usage
import { Icon } from 'lucide-react'
<Icon className="h-4 w-4" />
```

### shadcn/ui Components

- Extend using className prop
- Follow component composition patterns
- Use proper variant props
- Maintain accessibility features

## Copilot Commands

Use these comments for better suggestions:

```typescript
// Generate interface for component props
// Generate component with Tailwind styles
// Generate shadcn component implementation
// Generate type-safe event handlers
```

## Common Patterns

- Use layout components for consistent spacing
- Implement proper error boundaries
- Follow proper form handling patterns
- Use proper loading states
- Implement proper data fetching patterns

## Quality Standards

1. All components must be typed properly
2. All props must have interfaces
3. All functions must have return types
4. All event handlers must be typed
5. All styles must use Tailwind classes
6. All icons must be from Lucide React
7. All UI components should extend shadcn
