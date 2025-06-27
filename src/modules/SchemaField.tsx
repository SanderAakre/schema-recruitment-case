// React Imports
import { useState, forwardRef, useImperativeHandle, useEffect, useRef } from "react";

// MUI Imports
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Box,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  FormHelperText,
  Autocomplete,
} from "@mui/material";

// Custom components
import { FieldTitleComp, SubTextComp } from "@/components/TextComp";

// Utility components
import { validateFieldValue } from "@/utils/validateFieldValue";

// Types/interfaces
import type { FieldData, FieldValue, FieldValueMap, FieldPrimitive } from "@/types";

interface Props {
  field: FieldData;
  ref?: React.Ref<SchemaFieldHandle>;
  parentValues?: FieldValueMap;
  onValueChange?: (value: FieldPrimitive) => void;
  initialValue?: FieldPrimitive;
}

export interface SchemaFieldHandle {
  validate: () => FieldValue;
}

/** SchemaField is a reusable component that renders a field based on its type and properties.
 * It supports various field types such as text, number, checkbox, radio, select, and more.
 * The component handles validation and state management for the field value.
 * @param {Object} props - The properties for the SchemaField component.
 * @param {FieldData} props.field - The field data containing type, label, options, and other properties.
 * @returns {JSX.Element} The rendered SchemaField component.
 */
const SchemaField = forwardRef<SchemaFieldHandle, Props>(({ field, parentValues, onValueChange, initialValue }, ref) => {
  const [value, setValue] = useState<FieldPrimitive>(initialValue ?? field.defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const isActiveRef = useRef(true); // Default to active

  const { type = "text", tailwindClasses } = field;
  const options = (field.options ?? []).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));

  useEffect(() => {
    const active =
      !field.dependencies?.length ||
      field.dependencies.every((dep) => {
        const depValue = parentValues?.[dep.dependsOn];

        if (!dep.condition) {
          return depValue !== undefined && depValue !== "" && depValue !== null;
        }

        const validationError = validateFieldValue({ name: field.name, type: "text", required: true }, depValue, dep.condition);

        return !validationError;
      });

    isActiveRef.current = active;
    setDisabled(!active);
  }, [field, parentValues]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!isActiveRef.current) {
        return {
          fieldName: field.name,
          value: JSON.stringify(value),
          valid: true,
        };
      }
      const error = validateFieldValue(field, value);
      setError(error);
      return {
        fieldName: field.name,
        value: JSON.stringify(value),
        valid: !error,
        errorText: error ?? undefined,
      };
    },
  }));

  useEffect(() => {
    onValueChange?.(value);
    if (error) {
      setError(null); // Clear error when value changes to avoid stale errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box className={tailwindClasses}>
      {field.title && <FieldTitleComp data={field.title} />}
      {field.subText && <SubTextComp data={field.subText} />}
      {(() => {
        switch (type) {
          case "text":
          case "number":
          case "comment":
            return (
              <TextField
                fullWidth
                margin="dense"
                value={value}
                type={field.type}
                label={field.noLabel ? undefined : field.label ?? field.name}
                required={field.required}
                placeholder={field.placeholder}
                helperText={error || field.description}
                disabled={disabled}
                error={!!error}
                onChange={(e) => {
                  const val = field.type === "number" ? Number(e.target.value) : e.target.value;
                  setValue(val);
                }}
                multiline={type === "comment" ? true : false}
                rows={type === "comment" ? 4 : 1}
              />
            );
          default:
            return (
              <FormControl fullWidth margin="dense" error={!!error} required={field.required} disabled={disabled}>
                {/* Render label if present and not suppressed */}
                {field.label && !field.noLabel && <FormLabel>{field.label}</FormLabel>}

                {/* Checkbox */}
                {type === "checkbox" && (
                  <FormControlLabel
                    label={field.label ?? field.name}
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setValue(val);
                        }}
                      />
                    }
                  />
                )}

                {/* MultiCheckBox */}
                {field.type === "multiCheckbox" && (
                  <FormGroup>
                    {options.map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        label={opt.label ?? opt.value}
                        control={
                          <Checkbox
                            checked={Array.isArray(value) && value.includes(opt.value)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const val = opt.value;
                              setValue((prev) => {
                                const arr = Array.isArray(prev) ? prev : [];
                                const newValues = checked ? [...arr, val] : arr.filter((v) => v !== val);
                                return newValues;
                              });
                            }}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                )}

                {/* RadioSelect */}
                {field.type === "radio" && (
                  <RadioGroup value={value} defaultValue={field.defaultValue} name={field.name}>
                    {options.map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={<Radio />}
                        label={opt.label ?? opt.value}
                        defaultChecked={field.defaultValue === true}
                        onChange={() => {
                          setValue(opt.value);
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}

                {/* Autofill */}
                {field.type === "autofill" && (
                  <Autocomplete
                    disablePortal
                    options={options}
                    getOptionLabel={(option) => option.label ?? option.value}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    value={options.find((opt) => opt.value === value) || null}
                    onChange={(_event, newValue) => {
                      const selectedValue = newValue ? newValue.value : "";
                      setValue(selectedValue);
                    }}
                    renderInput={(params) => <TextField placeholder={field.placeholder} {...params} />}
                  />
                )}

                {/* Select */}
                {field.type === "select" && (
                  <Select
                    value={value}
                    displayEmpty
                    error={!!error}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    renderValue={(selected) => {
                      if (selected === "") {
                        return field.placeholder;
                      }
                      const selectedOption = options.find((opt) => opt.value === selected);
                      return selectedOption ? selectedOption.label : "";
                    }}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label ?? opt.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                <FormHelperText>{error || field.description}</FormHelperText>
              </FormControl>
            );
        }
      })()}
    </Box>
  );
});

export default SchemaField;
