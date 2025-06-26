// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

// Custom components
import { FieldTitleComp, SubTextComp } from "@/components/TextComp";

// Utility components
import { validateFieldValue } from "@/utils/validateFieldValue";

// Types/interfaces
import type { FieldData, SelectOption, FieldValue } from "@/types";

interface Props {
  field: FieldData;
}

const SchemaField = ({ field }: Props) => {
  const { type = "text", tailwindClasses } = field;

  return (
    <Box className={tailwindClasses}>
      {field.title && (
        <Box mb={1} id={`Field ${field.name} title root`}>
          <FieldTitleComp data={field.title} />
        </Box>
      )}
      {field.subText && (
        <Box mb={1} id={`Field ${field.name} subtext root`}>
          <SubTextComp data={field.subText} />
        </Box>
      )}
      {(() => {
        switch (type) {
          case "checkbox":
          case "number":
          case "text":
            return <TextInput field={field} />;
          case "comment":
            return <TextInput field={field} multiline rows={4} />;
          case "multiCheckbox":
          case "select":
          case "radio":
          case "autofill":
            return <SelectField field={field} />;
          default:
            <Typography variant="body2" color="error">
              Unsupported field type: {type}
            </Typography>;
            console.warn(`Unsupported field type "${type}" for field "${field.name}"`);
            return null;
        }
      })()}
    </Box>
  );
};

export default SchemaField;

const TextInput = ({ field, multiline = false, rows }: { field: FieldData; multiline?: boolean; rows?: number }) => {
  const [value, setValue] = useState<string | number | boolean>(field.defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  function validateValue(): string | null {
    // Check if the value is empty or null
    if (value === "" || value === null || value === undefined || value === false) {
      if (field.required) {
        if (field.validationConditions?.reverse) {
          // If the field is required but has reverse validation, do not set an error
          setError(null);
          return null;
        }
        // If the field is required and the value is empty, set an error
        setError(field.requiredErrorText ?? "This field is required");
        return field.requiredErrorText ?? "This field is required";
      } else {
        // If the field is not required and has reverse validation, set an error
        if (field.validationConditions?.reverse) {
          setError(field.requiredErrorText ?? "This field can not be enabled");
          return field.requiredErrorText ?? "This field can not be enabled";
        }
        // If the field is not required and the value is empty, there is no reason to check further
        setError(null);
        return null;
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
            setError(conditions.minLengthErrorText ?? `Minimum length is ${conditions.minValue}`);
            return conditions.minLengthErrorText ?? `Minimum length is ${conditions.minValue}`;
          } else if (typeof value === "number" && value < conditions.minValue) {
            setError(conditions.minValueErrorText ?? `Minimum value is ${conditions.minValue}`);
            return conditions.minValueErrorText ?? `Minimum value is ${conditions.minValue}`;
          }
        }
        // Check if the field is above the maximum length/value
        if (conditions.maxValue && typeof value !== "boolean") {
          if (typeof value === "string" && value.length > conditions.maxValue) {
            setError(conditions.maxLengthErrorText ?? `Maximum length is ${conditions.maxValue}`);
            return conditions.maxLengthErrorText ?? `Maximum length is ${conditions.maxValue}`;
          } else if (typeof value === "number" && value > conditions.maxValue) {
            setError(conditions.maxValueErrorText ?? `Maximum value is ${conditions.maxValue}`);
            return conditions.maxValueErrorText ?? `Maximum value is ${conditions.maxValue}`;
          }
        }
        // Check if the value is in the forbidden values list
        if (conditions.forbiddenValues && conditions.forbiddenValues.includes(value)) {
          setError(conditions.forbiddenValuesErrorText ?? "This value is not allowed");
          return conditions.forbiddenValuesErrorText ?? "This value is not allowed";
        }
        // Check if the value contains forbidden characters
        if (conditions.forbiddenCharacters && typeof value === "string") {
          const forbiddenChars = conditions.forbiddenCharacters.filter((char) => value.includes(char));
          if (forbiddenChars.length > 0) {
            const errorText = conditions.forbiddenCharactersErrorText ?? "This value contains forbidden characters";
            setError(errorText + `: ${forbiddenChars.join(", ")}`);
            return errorText + `: ${forbiddenChars.join(", ")}`;
          }
        }
        // Check if the value matches the regex pattern
        if (conditions.regex && typeof value === "string") {
          if (!conditions.regex.test(value)) {
            setError(conditions.regexErrorText ?? "This value does not match the required format");
            return conditions.regexErrorText ?? "This value does not match the required format";
          }
        }
      }
    }

    setError(null); // Clear error if validation passes
    return null; // Return null = no error
  }

  if (field.type === "checkbox") {
    return (
      <Box display="flex" flexDirection="column" gap={0.5} sx={{ width: "100%" }}>
        <FormControl fullWidth margin="dense" error={!!error}>
          <FormControlLabel
            label={field.label ?? field.name}
            required={field.required}
            defaultChecked={!!field.defaultValue}
            control={<Checkbox />}
            onChange={(e) => {
              setValue((e.target as HTMLInputElement).checked);
              if (error) {
                setError(null); // Clear error on change
              }
            }}
            onBlur={() => {
              validateValue();
            }}
          />
          <FormHelperText>{error || field.description}</FormHelperText>
        </FormControl>
      </Box>
    );
  }

  return (
    <TextField
      fullWidth
      margin="dense"
      type={field.type}
      label={field.noLabel ? undefined : field.label ?? field.name}
      required={field.required}
      placeholder={field.placeholder}
      defaultValue={typeof field.defaultValue === "string" || typeof field.defaultValue === "number" ? field.defaultValue : ""}
      helperText={field.description}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      error={!!error}
      onChange={(e) => {
        setValue(e.target.value);
        if (error) {
          setError(null); // Clear error on change
        }
      }}
      onBlur={() => {
        validateValue();
      }}
    />
  );
};

const SelectField = ({ field }: { field: FieldData }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  // Value state logic
  const [value, setValue] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  useEffect(() => {
    const loadOptions = async () => {
      if (!field.optionsUrl) {
        // If no optionsUrl is provided, load static options
        loadStaticOptions();
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(field.optionsUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const loadedOpts = (json as (string | SelectOption)[]).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
        setOptions(loadedOpts);

        const validDefault = typeof field.defaultValue === "string" && loadedOpts.some((opt) => opt.value === field.defaultValue);

        setValue(validDefault ? (field.defaultValue as string) : "");
      } catch (err) {
        console.error(`Failed to load options for "${field.name}" from ${field.optionsUrl}`, err);
        console.log(`Attempting to load static options instead.`);
        loadStaticOptions();
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStaticOptions: () => void = () => {
    const staticOpts: SelectOption[] = (field.options ?? []).map((opt: string | SelectOption) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
    // If no options are provided, log a warning
    if (staticOpts.length === 0) {
      console.warn(`No options provided for field "${field.name}".`);
      setDisabled(true);
      setOptions([{ value: "", label: "!! Failed to load options !!" }]);
    }
    setOptions(staticOpts);

    const validDefault: boolean = typeof field.defaultValue === "string" && staticOpts.some((opt) => opt.value === field.defaultValue);

    setValue(validDefault ? (field.defaultValue as string) : "");
    return;
  };

  return (
    <FormControl fullWidth margin="dense" error={!!error}>
      {field.label && !field.noLabel && <FormLabel>{field.label}</FormLabel>}
      {/* Render the correct field type */}
      {/* MultiCheckBox */}
      {field.type === "multiCheckbox" && (
        <FormGroup>
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              required={field.required}
              control={<Checkbox />}
              label={opt.label ?? opt.value}
              defaultChecked={field.defaultValue === true}
            />
          ))}
        </FormGroup>
      )}
      {/* RadioSelect */}
      {field.type === "radio" && (
        <RadioGroup defaultValue={field.defaultValue} name="radio-buttons-group">
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              required={field.required}
              control={<Radio />}
              label={opt.label ?? opt.value}
              defaultChecked={field.defaultValue === true}
            />
          ))}
        </RadioGroup>
      )}
      {/* Autofill */}
      {field.type === "autofill" && (
        <Autocomplete disablePortal options={options} renderInput={(params) => <TextField placeholder={field.placeholder} {...params} />} />
      )}
      {/* Select */}
      {field.type === "select" && (
        <Select
          value={value}
          displayEmpty
          required={field.required}
          disabled={loading || disabled}
          error={!!error}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return field.placeholder;
            }
            const selectedOption = options.find((opt) => opt.value === selected);
            return selectedOption ? selectedOption.label : "";
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label ?? opt.value}
              </MenuItem>
            ))
          )}
        </Select>
      )}
      <FormHelperText>{error || field.description}</FormHelperText>
    </FormControl>
  );
};
