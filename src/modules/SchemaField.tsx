// React Imports
import { useState, forwardRef, useImperativeHandle } from "react";

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
import type { FieldData, FieldValue } from "@/types";

interface Props {
  field: FieldData;
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
const SchemaField = forwardRef<SchemaFieldHandle, Props>(({ field }, ref) => {
  const [value, setValue] = useState<string | number | boolean | string[]>(field.defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { type = "text", tailwindClasses } = field;
  const options = (field.options ?? []).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));

  useImperativeHandle(ref, () => ({
    validate: () => {
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
                  if (error) {
                    setError(null); // Clear error on change
                  }
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
                    value={value}
                    label={field.label ?? field.name}
                    defaultChecked={!!field.defaultValue}
                    control={<Checkbox />}
                    onChange={(e) => {
                      setValue((e.target as HTMLInputElement).checked);
                      if (error) setError(null);
                    }}
                  />
                )}

                {/* MultiCheckBox */}
                {field.type === "multiCheckbox" && (
                  <FormGroup>
                    {options.map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={<Checkbox />}
                        label={opt.label ?? opt.value}
                        defaultChecked={Array.isArray(field.defaultValue) && field.defaultValue.includes(opt.value)}
                        onChange={(e) => {
                          const checked = (e.target as HTMLInputElement).checked;
                          const val = opt.value;

                          setValue((prev) => {
                            const arr = Array.isArray(prev) ? prev : [];
                            const newValues = checked ? [...arr, val] : arr.filter((v) => v !== val);

                            if (error) setError(null);
                            return newValues;
                          });
                        }}
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
                          if (error) setError(null);
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
                      if (error) setError(null);
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
