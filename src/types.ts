// This file defines the types/interfaces for any objects that can be used in the schema data.

// *** Main/high level module data ***

// The parent data object. Contains the data for the entire schema, which includes multiple pages and their fields.
export interface SchemaData {
  title: string | textData; // Title of the schema, will be displayed in the UI
  subText?: string | textData; // Optional description that shows below the title
  page: PageData[]; // Array of pages, each containing fields and optional field groups
  submitSettings?: SubmitData;
}

// Contains the data that make up one page of the form
export interface PageData {
  title?: textData; // Optional title for the page, will be displayed in the UI
  subText?: textData; // Optional subtext that shows below the title
  fieldGroup?: GroupData[]; // Optional array of field groups, which can be used to group fields together
  fields: FieldData[]; // Array of fields that will be displayed on the page
  nextPageButtonSettings?: ButtonData; // Optional settings for the next page button
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the page container
}

// Contains the data for each individual field in the form.
export interface FieldData {
  name: string; // Name of the field, should be unique!
  type?: "text" | "number" | "boolean" | "dropdown" | "autoFill" | ""; // Default to "text"
  label?: string; // Label that is displayed. Will default to the field name
  groupName?: string; // If set, the field will be grouped with other fields with the same group name
  helpText?: string; // Optional help tooltip text that shows when hovering a "?" icon next to the field label
  description?: string; // Optional description that shows below the field
  placeholder?: string; // Placeholder text for the field
  defaultValue?: string | number | boolean; // Default value for the field, if applicable
  options?: string[]; // For select type fields
  validationConditions?: FieldConditions; // Validation conditions for the field, where the field will only be valid if the conditions are met
  dependencies?: Dependency[]; // Optional array of dependencies, where the field will only be shown if the conditions are met
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the field container
}

export interface GroupData {
  name: string; // Name of the field group, should be unique!
  label?: string; // Label that is displayed for the group, defaults to the group name
  subText?: textData; // Optional subtext that shows below the group label
  collapsable?: boolean; // Default to false, if true, the group can be collapsed
  startCollapsed?: boolean; // Default to false, if true, the group starts collapsed (only relevant if collapsable is true, obviously)
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the group container
}

// *** UI Component Data ***

// Contains the data for a button
export interface ButtonData {
  text?: string; // Default to "Next", "Previous", or "Submit" depending on the context
  type?: "outlined" | "contained" | "text"; // Default to "contained"
  confirmation?: ConfirmationData; // Optional confirmation dialog data, will not be used by default
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the button
}

export interface textData {
  text?: string; // Text that will be displayed in the description
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption"; // Default to "body1"
  spans?: spanData[]; // Optional array of spans, will be used instead of text if provided
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the text container
}

export interface spanData {
  text: string; // Text that will be displayed in the span
  link?: string; // Optional link that will be applied to the text, if provided, the text will be clickable
  hoverText?: string; // Optional hover text that will be displayed when hovering the text
  bold?: boolean; // Default to false, if true, the text will be bold
  italic?: boolean; // Default to false, if true, the text will be italic
  underline?: boolean; // Default to false, if true, the text will be underlined
}

// ***  Conditions & Dependency Data ***

// Contains the data for the submit button on the last page
export interface SubmitData {
  submitText?: string; // Default to "Submit"
  successMessage?: string; // Default to "Form submitted successfully"
  confirmation?: ConfirmationData; // Confirmation dialog. Will use deafault values if not provided
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the submit button
}

export interface Dependency {
  name: string; // Name of the field that this field depends on
  reverse?: boolean; // Default to false, if true, the field will be shown if the condition is not met
  condition: "equals" | "notEquals" | "greaterThan" | "lessThan" | "contains"; // Condition that must be met for the field to be shown
  value: string | number | boolean; // Value that the dependency field must have for this field to be shown
  ifFalse?: "hidden" | "disabled"; // Default to "hidden", if "disabled", the field will be shown but not editable
  dependencyFalseText?: string; // Optional text that will be shown if the dependency condition is not met
}

export interface FieldConditions {
  reverse?: boolean; // Default to false, if true, the conditions will be reversed
  required?: boolean; // Default to false
  requiredErrorText?: string; // Default to "This field is required"
  minValue?: number; // Minimum number for number fields, or minimum length for text fields
  minValueErrorText?: string; // Default to "Minimum value is {minValue}" | "Minimum length is {minValue}"
  maxValue?: number; // Maximum number for number fields, or maximum length for text fields
  maxValueErrorText?: string; // Default to "Maximum value is {maxValue}" | "Maximum length is {maxValue}"
  forbiddenValues?: (string | number)[]; // Values that are not allowed for the field
  forbiddenValuesErrorText?: string; // Default to "This value is not allowed"
  forbiddenCharacters?: string[]; // Characters that are not allowed in the field
  forbiddenCharactersErrorText?: string; // Default to "This value contains forbidden characters"
  regex?: RegExp; // Regular expression that the field value must match
  regexErrorText?: string; // Default to "This value does not match the required format"
}

// *** Misc. Utility Data ***

// contains the data for generic confirmation dialog
export interface ConfirmationData {
  use?: boolean; // Default to true, if false, no confirmation dialog will be shown
  title?: string; // Title of the confirmation dialog, default to "Confirm Action"
  message?: string; // Message to display in the confirmation dialog, default to "Are you sure you want to proceed?"
  confirmText?: string; // Text for the confirm button, default to "Confirm"
  cancelText?: string; // Text for the cancel button, default to "Cancel"
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the confirmation dialog
}
