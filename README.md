# Dynamic Schema-Driven Form

This project is a React-based dynamic form system that generates pages and input fields based on a JSON schema. It supports grouping, field validation, dependencies, and customizable field types using Material UI (MUI).

## Main Features

- Dynamic page and field generation from JSON schema
- Modular components (Field, Group, Page, Form) build from the JSON data
- Lots of configurable text/info options for each module (Title, description, placeholder)
- Different field types (text, number, checkbox, radio, select, autocomplete)
- Built-in field validation (required, custom rules, regex, value constraints)
- Dependency-based field visibility (Fields can be deactivated or activated based on the value of other fields)
- Fully typed with TypeScript
- Lots of default values and options for each field type, both to avoid errors and to make it easier to use

### Unfinished/Partially Implemented Features

These features were planned for and therefore might have some code related to them, but they are not fully implemented:

- Customizable with Tailwind classes in through JSON data (Was going to be used to easely customize styles in the form of a string added to the field data)
- Importing select field options from a JSON file (Usefull for large sets of options, like countries, cities, etc.)

## Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (Only partially implemented, not operational yet)

## Components and Data Structure

See `src/types.ts` file for more detailed type definitions.

### Main Components

- `SchemaForm`: Top-level component that renders the entire form
- `SchemaPage`: Renders a single page of fields and groups
- `FieldGroup`: Layout wrapper for grouped fields
- `SchemaField`: Renders an individual field based on its type

### UI components

- `TextComp`: Renders styled text fields, accepts a string, or a `TextData` object for more complex configurations
- `ButtonComp`: Renders buttons with customizable text and actions, with presets for next page, previous page, and submit actions
- `ConfirmComp`: Displays confirmation dialogs for form submission, with customizable messages and actions

### Utilities

- `validateFieldValue`: Centralized validation logic for field values

## Supported Field Types

- Text
- Number
- Comment (multiline)
- Checkbox
- Multi-checkbox (array)
- Radio group
- Select dropdown
- Autocomplete (searchable dropdown)

## Field Validation / Conditional Logic

- Required fields
- Reverse required fields (fields that must not be filled, e.g., for conditional logic)
- Custom validation rules
- Regex validation
- Value constraints (min/max for numbers)
- Conditional visibility based on other field values (dependencies)

## Installation

```bash
npm install
npm run dev
```

## Note

The project is made to import
