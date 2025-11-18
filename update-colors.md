# Dark Mode Palette - Color Class Mapping

## Automatic Replacements

### Background Colors

- `bg-white dark:bg-gray-900` → `bg-background`
- `bg-white dark:bg-gray-800` → `bg-background`
- `bg-gray-900` → `bg-background`
- `dark:bg-gray-900` → (remove, use bg-background)
- `bg-gray-50 dark:bg-gray-800` → `bg-background-elevated`
- `bg-gray-100 dark:bg-gray-800` → `bg-background-elevated`
- `bg-gray-100 dark:bg-gray-700` → `bg-background-elevated`
- `dark:bg-gray-800` → `bg-background-secondary`
- `dark:bg-gray-700` → `bg-background-elevated`
- `bg-gray-200 dark:bg-gray-800` → `bg-background-elevated`
- `bg-gray-300 dark:bg-gray-700` → `bg-background-elevated`

### Text Colors

- `text-gray-900 dark:text-gray-100` → `text-text-primary`
- `dark:text-gray-100` → `text-text-primary`
- `text-gray-600 dark:text-gray-400` → `text-text-secondary`
- `text-gray-600 dark:text-gray-300` → `text-text-secondary`
- `dark:text-gray-400` → `text-text-secondary`
- `dark:text-gray-300` → `text-text-secondary`
- `text-gray-500 dark:text-gray-400` → `text-text-muted`
- `dark:text-gray-500` → `text-text-muted`
- `text-primary` → `text-accent-blue`

### Border Colors

- `border-gray-200 dark:border-gray-800` → `border-border`
- `border-gray-200 dark:border-gray-700` → `border-border`
- `border-gray-300 dark:border-gray-700` → `border-border`
- `dark:border-gray-800` → `border-border`
- `dark:border-gray-700` → `border-border`
- `dark:border-gray-600` → `border-border-card`

### Hover States

- `hover:bg-gray-100 dark:hover:bg-gray-800` → `hover:bg-background-elevated`
- `hover:bg-gray-100 dark:hover:bg-gray-700` → `hover:bg-background-elevated`
- `hover:bg-gray-200 dark:hover:bg-gray-700` → `hover:bg-background-elevated`
- `dark:hover:bg-gray-800` → `hover:bg-background-elevated`
- `dark:hover:bg-gray-700` → `hover:bg-background-elevated`
- `hover:text-primary` → `hover:text-accent-blue`

### Special Cases

- Breaking news tags: `bg-accent-red text-text-primary`
- Links and highlights: `text-accent-blue hover:text-accent-softBlue`
- Category tags: `bg-background-elevated text-text-secondary hover:bg-background-secondary`
