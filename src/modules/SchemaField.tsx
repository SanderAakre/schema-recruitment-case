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
  onValidate?: (result: FieldValue) => void;
}

const SchemaField = ({ field, onValidate }: Props) => {
  const { type = "text", tailwindClasses } = field;

  return (
    <Box className={tailwindClasses}>
      {field.title && <FieldTitleComp data={field.title} />}
      {field.subText && <SubTextComp data={field.subText} />}
      {(() => {
        switch (type) {
          case "text":
          case "checkbox":
          case "number":
            return <TextInput field={field} onValidate={onValidate} />;
          case "comment":
            return <TextInput field={field} onValidate={onValidate} multiline rows={4} />;
          case "select":
          case "radio":
          case "multiCheckbox":
          case "autofill":
            return <SelectInput field={field} onValidate={onValidate} />;
          default:
            console.warn(`Unsupported field type "${type}"`);
            return <Typography color="error">Unsupported field type</Typography>;
        }
      })()}
    </Box>
  );
};

export default SchemaField;

const TextInput = ({
  field,
  multiline = false,
  rows = 1,
  onValidate,
}: {
  field: FieldData;
  multiline?: boolean;
  rows?: number;
  onValidate?: (result: FieldValue) => void;
}) => {
  const [value, setValue] = useState<string | number | boolean>(field.defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleValidation = (nextValue: string | number | boolean) => {
    const result = validateFieldValue(field, nextValue);
    setError(result);
    onValidate?.({
      fieldName: field.name,
      value: JSON.stringify(nextValue),
      valid: result ? false : true,
      errorText: result ?? undefined,
    });
  };

  if (field.type === "checkbox") {
    return (
      <Box display="flex" flexDirection="column" gap={0.5} sx={{ width: "100%" }}>
        <FormControl fullWidth margin="dense" error={!!error}>
          <FormControlLabel
            value={value}
            label={field.label ?? field.name}
            required={field.required}
            defaultChecked={!!field.defaultValue}
            control={<Checkbox />}
            onChange={(e) => {
              setValue((e.target as HTMLInputElement).checked);
              if (error) {
                handleValidation((e.target as HTMLInputElement).checked); // Validate on change
              }
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
          handleValidation(val); // Validate on change
        }
      }}
      multiline={multiline}
      rows={rows}
    />
  );
};

const SelectInput = ({ field, onValidate }: { field: FieldData; onValidate?: (result: FieldValue) => void }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<string>("");

  const handleValidation = (nextValue: string) => {
    const result = validateFieldValue(field, nextValue);
    setError(result);
    onValidate?.({
      fieldName: field.name,
      value: JSON.stringify(nextValue),
      valid: result ? false : true,
      errorText: result ?? undefined,
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    setValue(val);
    handleValidation(val);
  };

  useEffect(() => {
    const loadOptions = async () => {
      if (!field.optionsUrl) {
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

        const defaultStr = typeof field.defaultValue === "string" ? field.defaultValue : "";
        const validDefault = loadedOpts.some((opt) => opt.value === defaultStr);
        const defaultVal = validDefault ? defaultStr : "";
        setValue(defaultVal);
      } catch (err) {
        console.error(`Failed to load options for "${field.name}"`, err);
        console.log(`Attempting to load static options instead...`);
        loadStaticOptions();
      } finally {
        setLoading(false);
      }
    };

    const loadStaticOptions = () => {
      const staticOpts = (field.options ?? []).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
      if (staticOpts.length === 0) {
        setDisabled(true);
        setOptions([{ value: "", label: "ERROR: No options!" }]);
      } else {
        setOptions(staticOpts);
      }

      const defaultStr = typeof field.defaultValue === "string" ? field.defaultValue : "";
      const validDefault = staticOpts.some((opt) => opt.value === defaultStr);
      const defaultVal = validDefault ? defaultStr : "";
      setValue(defaultVal);
    };

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <RadioGroup value={value} onChange={handleChange} defaultValue={field.defaultValue} name={field.name}>
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
        <Autocomplete
          disablePortal
          options={options}
          getOptionLabel={(option) => option.label ?? option.value}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          value={options.find((opt) => opt.value === value) || null}
          onChange={(_event, newValue) => {
            const selectedValue = newValue ? newValue.value : "";
            setValue(selectedValue);
            handleValidation(selectedValue);
          }}
          renderInput={(params) => <TextField placeholder={field.placeholder} {...params} />}
        />
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
