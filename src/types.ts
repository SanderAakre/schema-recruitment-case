// This file defines the types/interfaces for any objects that can be used in the schema data.

// *** Main/high level module data ***

// The parent data object. Contains the data for the entire schema, which includes multiple pages and their fields.
export interface SchemaData {
  title: string | TextData; // Title of the schema, will be displayed in the UI
  subText?: string | TextData; // Optional description that shows below the title
  pages: PageData[]; // Array of pages, each containing fields and optional field groups
  nextPageButton?: ButtonData; // Optional settings for the next page button, will be used as default for all pages
  previousPageButton?: ButtonData; // Optional settings for the previous page button, will be used as default for all pages
  submitButton?: ButtonData; // Optional settings for the submit button, will be used as default for all pages
  successMessage?: string; // Default to "Form submitted successfully"
  errorMessage?: string; // Default to "An unspecified error occurred while submitting the form"
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the schema container
}

// Contains the data that make up one page of the form
export interface PageData {
  name?: string; // Optional name for the page, mostly for clarity in the schema data
  title?: string | TextData; // Optional title for the page, will be displayed in the UI
  subText?: string | TextData; // Optional subtext that shows below the title
  fieldGroups?: GroupData[]; // Optional array of field groups, which can be used to group fields together
  fields: FieldData[]; // Array of fields that will be displayed on the page
  pageButton?: ButtonData; // Optional settings for the next page button, will override the global page button on this page if set
  gapSize?: "tight" | "half" | "normal" | "wide"; // Controls the gap size between fields in the group (default: "normal")
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the page container
}

// Contains data for field groups, which can be used to organize fields into logical sections, and can be collapsible.
export interface GroupData {
  name: string; // Name of the field group, should be unique!
  title?: string | TextData; // Title displayed at the top of the group, only thing visible if a group is collapsed
  subText?: string | TextData; // Optional subtext that shows below the group label
  collapsable?: boolean; // Default to false, if true, the group can be collapsed
  startCollapsed?: boolean; // Default to false, if true, the group starts collapsed (only relevant if collapsable is true, obviously)
  gapSize?: "tight" | "half" | "normal" | "wide"; // Controls the gap size between fields in the group (default: "tight")
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the group container
}

// Contains the data for each individual field in the form.
export interface FieldData {
  name: string; // Name of the field, should be unique!
  type?: "text" | "comment" | "number" | "checkbox" | "multiCheckbox" | "select" | "radio" | "autofill"; // Default to "text"
  options?: SelectOption[] | string[]; // Array of options for select fields, either as SelectOption objects or simple strings
  optionsUrl?: string; // Optional URL to fetch options from instead of using the options array
  title?: string | TextData; // Optional title for the field, will be displayed above the field
  subText?: string | TextData; // Optional subtext that shows below the title
  label?: string; // Label for the field, (defaults to the field name if not provided)
  required?: boolean; // Default to false
  requiredErrorText?: string; // Default to "This field is required"
  noLabel?: boolean; // Whether to hide the label, (default: false)
  groupName?: string; // If set, the field will be grouped with other fields with the same group name
  description?: string; // Optional description that shows below the field
  placeholder?: string; // Placeholder text for the field
  defaultValue?: string | number | boolean; // Default value for the field, if applicable
  validationConditions?: FieldConditions; // Validation conditions for the field, where the field will only be valid if the conditions are met
  dependencies?: Dependency[]; // Optional array of dependencies, where the field will only be shown if the conditions are met
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the field container
}

// *** Field Type Data ***

// Contains the data for a select option
export interface SelectOption {
  value: string; // Value of the option
  label?: string; // Optional label for the option, if not provided, the value will be used as the label
  aliases?: string[]; // Optional alias for the option, used for autofill select type
}

// *** UI Component Data ***

// Contains the data for a button
export interface ButtonData {
  text?: string; // Default to "Next", "Previous", or "Submit" depending on the context
  type?: "outlined" | "contained" | "text"; // Default to "contained"
  confirmation?: ConfirmationData; // Optional confirmation dialog data, will not be used by default
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the button
}

export interface TextData {
  text?: string; // Text that will be displayed in the description
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption"; // Default to "body1"
  spans?: SpanData[]; // Optional array of spans, will be used instead of text if provided
  helpText?: string; // Optional help text that will be displayed when hovering a "?" icon next to the text
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the text container
}

export interface SpanData {
  text: string; // Text that will be displayed in the span
  link?: string; // Optional link that will be applied to the text, if provided, the text will be clickable
  hoverText?: string; // Optional hover text that will be displayed when hovering the text
  bold?: boolean; // Default to false, if true, the text will be bold
  italic?: boolean; // Default to false, if true, the text will be italic
  underline?: boolean; // Default to false, if true, the text will be underlined
}

// contains the data for generic confirmation dialog
export interface ConfirmationData {
  use?: boolean; // Default to true, if false, no confirmation dialog will be shown
  title?: TextData | string; // Title of the confirmation dialog, will be displayed in the UI
  subText?: TextData | string; // Optional description that shows below the title
  confirmButton?: string | ButtonData; // Text or button data for the confirm button, default to "Confirm"
  cancelButton?: string | ButtonData; // Text or button data for the cancel button, default to "Cancel"
  tailwindClasses?: string; // Optional Tailwind CSS classes to apply to the confirmation dialog
}

// ***  Conditions, Confirmation & Dependency Data ***

// Contains the data for a field dependency, which is used to show/hide fields based on the value of another field
// This is used to create dynamic forms where fields can be shown or hidden based on user input
export interface Dependency {
  name: string; // Name of the field that this field depends on
  reverse?: boolean; // Default to false, if true, the field will be shown if the condition is not met
  condition?: "required" | "equals" | "notEquals" | "greaterThan" | "lessThan" | "contains"; // Type of condition to check (default to "required")
  value?: string | number | boolean; // Value that the dependency field must have for this field to be shown
  ifFalse?: "hidden" | "disabled"; // Default to "hidden", if "disabled", the field will be shown but not editable
  dependencyFalseText?: string; // Optional text that will be shown if the dependency condition is not met
}

export interface FieldConditions {
  reverse?: boolean; // Default to false, if true, the conditions will be reversed
  minValue?: number; // Minimum number for number fields, or minimum length for text fields
  minValueErrorText?: string;
  minLengthErrorText?: string;
  maxValue?: number; // Maximum number for number fields, or maximum length for text fields
  maxValueErrorText?: string;
  maxLengthErrorText?: string;
  forbiddenValues?: (string | number)[]; // Values that are not allowed in the field
  forbiddenValuesErrorText?: string;
  mandatoryValues?: (string | number)[]; // Values that must be present in the field value
  mandatoryValuesErrorText?: string; // Default to "This value must be one of the following values"
  forbiddenCharacters?: string[]; // Characters that are not allowed in the field
  forbiddenCharactersErrorText?: string; // Default to "This value contains forbidden characters"
  mandatoryCharacters?: string[]; // Characters that must be present in the field value
  mandatoryCharactersErrorText?: string; // Default to "This value must contain the following characters
  regex?: RegExp; // Regular expression that the field value must match
  regexErrorText?: string; // Default to "This value does not match the required format"
}

// *** Field Value Data ***
// !! This is not used in by the schema data, but is used in the form validation and submission process !!

export interface FieldValue {
  fieldName: string; // Name of the field
  value: string; // The value is parsed to a JSON string, so it can be any type of value (string, number, boolean, etc.)
  valid: boolean; // Optional flag to indicate if the field value is valid, will be set during validation
  active?: boolean; // If not true, the field will be ignored in the form submission and validation process
  errorText?: string; // Optional error text that will be shown if the field value is not valid
}

export interface PageValues {
  pageName: string; // Name of the page
  fields: FieldValue[]; // Array of field values for the page
}
