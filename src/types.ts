// This file contains TypeScript interfaces and types that make up the JSON data structure, and types used in a schema-driven form system.

// 1. Schema data structure interfaces

// 1.1 SchemaData and high-level module interfaces

/**
 * Represents the root data structure for the entire schema-driven form system.
 *
 * @remarks
 * This interface defines the top-level configuration for a form, including its title, description,
 * pages, and global button settings. It also allows for customization of success/error messages and styling.
 *
 * @property title - The title of the schema, displayed in the UI. Can be a simple string or a {@link TextData} object for advanced formatting.
 * @property subText - Optional description shown below the title. Can be a string or {@link TextData}.
 * @property pages - An array of {@link PageData} objects, each representing a page in the form.
 * @property nextPageButton - Optional default settings for the "Next" page button, applied to all pages unless overridden.
 * @property previousPageButton - Optional default settings for the "Previous" page button, applied to all pages unless overridden.
 * @property submitButton - Optional default settings for the "Submit" button, applied to all pages unless overridden.
 * @property successMessage - Optional message displayed upon successful form submission. Defaults to "Form submitted successfully".
 * @property errorMessage - Optional message displayed if an error occurs during submission. Defaults to "An unspecified error occurred while submitting the form".
 * @property tailwindClasses - Optional Tailwind CSS classes to apply to the schema container for custom styling.
 */
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

/** Represents a page in the schema-driven form system.
 * @remarks
 * Each page can contain fields, field groups, and optional buttons for navigation.
 * It allows for customization of layout, spacing, and styling.
 *
 * @property name - Optional name for the page, mostly for clarity in the schema data.
 * @property title - Optional title for the page, will be displayed in the UI. Can be a simple string or a {@link TextData} object for advanced formatting.
 * @property subText - Optional subtext that shows below the title. Can be a string or {@link TextData}.
 * @property fieldGroups - Optional array of {@link GroupData} objects, which can be used to group fields together logically.
 * @property fields - Array of {@link FieldData} objects that will be displayed on the page.
 * @property pageButton - Optional settings for the next page button, will override the global page button on this page if set.
 * @property gapSize - Controls the gap size between fields in the group, can be "tight", "half", "normal", or "wide". Defaults to "normal".
 * @property tailwindClasses - Optional Tailwind CSS classes to apply to the page container for custom styling.
 */
export interface PageData {
  name?: string;
  title?: string | TextData;
  subText?: string | TextData;
  fieldGroups?: GroupData[];
  fields: FieldData[];
  pageButton?: ButtonData;
  gapSize?: "tight" | "half" | "normal" | "wide";
  tailwindClasses?: string;
}

/** Represents a group of fields in the schema-driven form system.
 * @remarks
 * Field groups allow for logical grouping of fields, which can be collapsed or expanded.
 * They can also have titles, subtexts, and custom gap sizes between fields.
 *
 * @property name - Name of the field group, should be unique!
 * @property title - Optional title displayed at the top of the group, only thing visible if a group is collapsed. Can be a simple string or a {@link TextData} object for advanced formatting.
 * @property subText - Optional subtext that shows below the group label. Can be a string or {@link TextData}.
 * @property collapsable - Default to false, if true, the group can be collapsed.
 * @property startCollapsed - Default to false, if true, the group starts collapsed (only relevant if collapsable is true).
 * @property gapSize - Controls the gap size between fields in the group (default: "tight").
 * @property tailwindClasses - Optional Tailwind CSS classes to apply to the group container for custom styling.
 */
export interface GroupData {
  name: string;
  title?: string | TextData;
  subText?: string | TextData;
  collapsable?: boolean;
  startCollapsed?: boolean;
  gapSize?: "tight" | "half" | "normal" | "wide";
  tailwindClasses?: string;
}

/** Represents a field in the schema-driven form system.
 * @remarks
 * Fields can be of various types (text, number, checkbox, etc.) and can have options for select fields.
 * They can also have validation conditions, dependencies, and custom styling.
 * @property name - Name of the field, should be unique!
 * @property type - Type of the field, can be "text", "comment", "number", "checkbox", "multiCheckbox", "select", "radio", or "autofill". Defaults to "text".
 * @property options - Array of options for select fields, either as {@link SelectOption} objects or simple strings.
 * @property optionsUrl - Optional URL to fetch options from instead of using the options array.
 * @property title - Optional title for the field, will be displayed above the field. Can be a simple string or a {@link TextData} object for advanced formatting.
 * @property subText - Optional subtext that shows below the title. Can be a string or {@link TextData}.
 * @property label - Label for the field, defaults to the field name if not provided.
 * @property disabled - If true, the field will be disabled and not editable. Defaults to false.
 * @property required - Whether the field is required, defaults to false.
 * @property requiredErrorText - Error text shown if the field is required but not filled, defaults to "This field is required".
 * @property noLabel - Whether to hide the label, defaults to false.
 * @property groupName - If set, the field will be grouped with other fields with the same group name.
 * @property description - Optional description that shows below the field.
 * @property placeholder - Placeholder text for the field, used in text and number fields.
 * @property defaultValue - Default value for the field, if applicable (e.g., for text, number, checkbox).
 * @property validationConditions - Validation conditions for the field, where the field will only be valid if the conditions are met.
 * @property dependencies - Optional array of dependencies, where the field will only be shown if the conditions are met.
 * @property tailwindClasses - Optional Tailwind CSS classes to apply to the field container for custom styling.
 */
export interface FieldData {
  name: string;
  type?: "text" | "comment" | "number" | "checkbox" | "multiCheckbox" | "select" | "radio" | "autofill";
  options?: SelectOption[] | string[];
  optionsUrl?: string;
  title?: string | TextData;
  subText?: string | TextData;
  label?: string;
  disabled?: boolean; // Optional, if true, the field will be disabled
  required?: boolean;
  requiredErrorText?: string;
  noLabel?: boolean;
  groupName?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  maxInput?: number; // Maximum value for number fields, or maximum length for text fields
  minInput?: number; // Minimum value for number fields
  validationConditions?: FieldConditions;
  dependencies?: Dependency[];
  tailwindClasses?: string;
}

// 1.2 Supporting data interfaces

// Contains the data for a select option
export interface SelectOption {
  value: string; // Value of the option
  label?: string; // Optional label for the option, if not provided, the value will be used as the label
  aliases?: string[]; // Optional alias for the option, used for autofill select type
}

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

// 1.3 Field condition and validation data interfaces

// Contains the data for a field dependency, which is used to show/hide fields based on the value of another field
// This is used to create dynamic forms where fields can be shown or hidden based on user input
export interface Dependency {
  dependsOn: string; // the name of the field it depends on
  condition?: FieldConditions; // If not set the depemdsOn field must be filled(not empty)
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

// 2. Form Values and Submission interfaces
// *Not used in the schema data structure, but used for form submission and validation*

// 2.1 Form Values and Submission interfaces

// Represents a field value in the form submission
export interface FieldValue {
  fieldName: string; // Name of the field
  value: string; // The value is parsed to a JSON string, so it can be any type of value (string, number, boolean, etc.)
  valid: boolean; // Optional flag to indicate if the field value is valid, will be set during validation
  active?: boolean; // If not true, the field will be ignored in the form submission and validation process
  errorText?: string; // Optional error text that will be shown if the field value is not valid
}

// Represents the values of a page in the form submission
export interface PageValues {
  pageName: string; // Name of the page
  fields: FieldValue[]; // Array of field values for the page
}

// 2.2 Field Primitive Types and Value Maps

// Represents a primitive field value, which can be a string, number, boolean, or an array of strings
export type FieldPrimitive = string | number | boolean | string[];

// Represents a map of field names to their primitive values, used for storing form data
export type FieldValueMap = Record<string, FieldPrimitive>;
