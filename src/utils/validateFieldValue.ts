import type { FieldData, FieldConditions, FieldPrimitive } from "@/types";

/**
 * Validates a field value based on its validation conditions.
 * Returns an error message if validation fails, or null if valid.
 * @param field - The field data containing validation rules.
 * @param value - The value to validate, can be string, number, boolean, SelectOption, or null/undefined.
 * @returns An error message string if validation fails, or null if valid.
 */
export function validateFieldValue(field: FieldData, value: FieldPrimitive | undefined | null, overrideConditions?: FieldConditions): string | null {
  const cond = overrideConditions ?? field.validationConditions;

  // Handle required and empty and reverse conditions
  const isEmpty = value === null || value === undefined || value === "" || (typeof value === "boolean" && value === false);
  if (isEmpty) {
    if (field.required) {
      if (cond?.reverse) {
        return null;
      }
      return field.requiredErrorText ?? "This field is required";
    }
  } else if (cond?.reverse && field.required) {
    return field.requiredErrorText ?? "This field is not allowed to have a value";
  }

  // Check constraints
  if (cond && (typeof value === "string" || typeof value === "number" || Array.isArray(value))) {
    // minValue
    if (typeof value === "string" && cond.minValue && value.length < cond.minValue) {
      return cond.minLengthErrorText ?? `Minimum length is ${cond.minValue}`;
    }
    if (typeof value === "number" && cond.minValue && value < cond.minValue) {
      return cond.minValueErrorText ?? `Minimum value is ${cond.minValue}`;
    }
    if (Array.isArray(value) && cond.minValue && value.length < cond.minValue) {
      return cond.minLengthErrorText ?? `Minimum length is ${cond.minValue}`;
    }

    // maxValue
    if (typeof value === "string" && cond.maxValue && value.length > cond.maxValue) {
      return cond.maxLengthErrorText ?? `Maximum length is ${cond.maxValue}`;
    }
    if (typeof value === "number" && cond.maxValue && value > cond.maxValue) {
      return cond.maxValueErrorText ?? `Maximum value is ${cond.maxValue}`;
    }
    if (Array.isArray(value) && cond.maxValue && value.length > cond.maxValue) {
      return cond.maxLengthErrorText ?? `Maximum length is ${cond.maxValue}`;
    }

    // forbiddenValues
    if (cond.forbiddenValues && (typeof value === "string" || typeof value === "number") && cond.forbiddenValues.includes(value)) {
      return cond.forbiddenValuesErrorText ?? "This value is not allowed";
    }

    // forbiddenCharacters
    if (typeof value === "string" && cond.forbiddenCharacters) {
      const forbidden = cond.forbiddenCharacters.filter((char) => value.includes(char));
      if (forbidden.length > 0) {
        return cond.forbiddenCharactersErrorText ?? `Forbidden characters: ${forbidden.join(", ")}`;
      }
    }

    // regex
    if (typeof value === "string" && cond.regex) {
      let regex: RegExp;
      if (cond.regex instanceof RegExp) {
        regex = cond.regex;
      } else if (typeof cond.regex === "string") {
        // Convert "/abc/i" => new RegExp("abc", "i")
        const match = (cond.regex as string).match(/^\/(.+)\/([gimsuy]*)$/);
        if (match) {
          regex = new RegExp(match[1], match[2]);
        } else {
          regex = new RegExp(cond.regex); // fallback
        }
      } else {
        return "Invalid regex pattern";
      }

      if (!regex.test(value)) {
        return cond.regexErrorText ?? "This value does not match the required format";
      }
    }
  }

  return null; // No validation errors
}
