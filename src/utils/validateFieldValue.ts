import type { FieldData, SelectOption } from "@/types";

export function validateFieldValue(field: FieldData, value: string | number | boolean | SelectOption): { isValid: boolean; errorText?: string } {
  // Check if the value is empty or null
  if (value === "" || value === null || value === undefined || value === false) {
    if (field.required) {
      if (field.validationConditions?.reverse) {
        // If the field is required but has reverse validation, do not set an error
        return { isValid: true };
      }
      // If the field is required and the value is empty, set an error
      return { isValid: false, errorText: field.requiredErrorText ?? "This field is required" };
    } else {
      // If the field is not required and has reverse validation, set an error
      if (field.validationConditions?.reverse) {
        return { isValid: false, errorText: field.requiredErrorText ?? "This field can not be enabled" };
      }
      // If the field is not required and the value is empty, there is no reason to check further
      return { isValid: true };
    }
  }

  // Check if the field has other validation conditions
  const conditions = field.validationConditions;
  if (conditions) {
    // Checks that are only relevant for strings or numbers
    if (typeof value === "string" || typeof value === "number") {
      // Check if the field is below the minimum length/value
      if (conditions.minValue && typeof value !== "boolean") {
        if (typeof value === "string" && value.length < conditions.minValue) {
          return { isValid: false, errorText: conditions.minLengthErrorText ?? `Minimum length is ${conditions.minValue}` };
        } else if (typeof value === "number" && value < conditions.minValue) {
          return { isValid: false, errorText: conditions.minValueErrorText ?? `Minimum value is ${conditions.minValue}` };
        }
      }
      // Check if the field is above the maximum length/value
      if (conditions.maxValue && typeof value !== "boolean") {
        if (typeof value === "string" && value.length > conditions.maxValue) {
          return { isValid: false, errorText: conditions.maxLengthErrorText ?? `Maximum length is ${conditions.maxValue}` };
        } else if (typeof value === "number" && value > conditions.maxValue) {
          return { isValid: false, errorText: conditions.maxValueErrorText ?? `Maximum value is ${conditions.maxValue}` };
        }
      }
      // Check if the value is in the forbidden values list
      if (conditions.forbiddenValues && conditions.forbiddenValues.includes(value)) {
        return { isValid: false, errorText: conditions.forbiddenValuesErrorText ?? "This value is not allowed" };
      }
      // Check if the value contains forbidden characters
      if (conditions.forbiddenCharacters && typeof value === "string") {
        const forbiddenChars = conditions.forbiddenCharacters.filter((char) => value.includes(char));
        if (forbiddenChars.length > 0) {
          const errorText = conditions.forbiddenCharactersErrorText ?? "This value contains forbidden characters";
          return { isValid: false, errorText: errorText + `: ${forbiddenChars.join(", ")}` };
        }
      }
      // Check if the value matches the regex pattern
      if (conditions.regex && typeof value === "string") {
        if (!conditions.regex.test(value)) {
          return { isValid: false, errorText: conditions.regexErrorText ?? "This value does not match the required format" };
        }
      }
    }
  }
  return { isValid: true };
}
