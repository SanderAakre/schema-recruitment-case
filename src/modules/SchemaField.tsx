// React Imports
import { useEffect, useState } from "react";
// MUI Imports
import { TextField, Checkbox, FormControlLabel, MenuItem, Box, CircularProgress } from "@mui/material";

// Types/interfaces
import type { FieldData, SelectOption } from "@/types";

interface Props {
  field: FieldData;
}

const SchemaField = ({ field }: Props) => {
  const { type = "text", tailwindClasses } = field;

  return (
    <Box className={tailwindClasses}>
      {(() => {
        switch (type) {
          case "number":
          case "text":
            return <TextInput field={field} />;
          case "comment":
            return <TextInput field={field} multiline rows={4} />;
          case "boolean":
            return <FormControlLabel sx={{ width: "100%" }} control={<Checkbox defaultChecked={!!field.defaultValue} />} label={field.label ?? field.name} />;
          case "select":
            return <SelectField field={field} />;
          case "multiSelect":
            return <MultiSelectField field={field} />;
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default SchemaField;

const TextInput = ({ field, multiline = false, rows }: { field: FieldData; multiline?: boolean; rows?: number }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      type={field.type}
      label={field.label ?? field.name}
      placeholder={field.placeholder}
      defaultValue={typeof field.defaultValue === "string" || typeof field.defaultValue === "number" ? field.defaultValue : ""}
      helperText={field.description}
      multiline={multiline}
      rows={rows}
    />
  );
};

const SelectField = ({ field }: { field: FieldData }) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const fieldDefault = field.defaultValue as string | undefined;

  useEffect(() => {
    const loadOptions = async () => {
      if (!field.optionsUrl) {
        // Handle static options
        const staticOpts = (field.options ?? []).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
        // If no options are provided, log a warning
        if (staticOpts.length === 0) {
          console.warn(`No options provided for field "${field.name}". Please provide options or an optionsUrl.`);
        }
        setOptions(staticOpts);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(field.optionsUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const loadedOpts = (json as (string | SelectOption)[]).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
        setOptions(loadedOpts);
      } catch (err) {
        console.error(`Failed to load options for field: "${field.name}", URL: "${field.optionsUrl}":`, err);
        setDisabled(true);
        setOptions([{ value: "", label: "!! Failed to load options !!" }]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.options, field.optionsUrl]);

  const defaultIsValid = options.some((opt) => opt.value === fieldDefault);
  const fallbackValue = defaultIsValid ? fieldDefault : "";

  if (field.optionsUrl && loading) {
    return (
      <TextField
        fullWidth
        margin="normal"
        label={field.label ?? field.name}
        helperText="Loading options..."
        disabled
        slotProps={{
          input: {
            endAdornment: <CircularProgress size={20} />,
          },
        }}
      />
    );
  }

  return (
    <TextField
      fullWidth
      margin="normal"
      select
      label={field.label ?? field.name}
      defaultValue={fallbackValue}
      helperText={error ?? field.description}
      disabled={options.length === 0}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label ?? opt.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

const MultiSelectField = ({ field }: Props) => {
  const options = (field.options ?? []).map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : (opt as SelectOption)));

  return (
    <TextField
      fullWidth
      margin="normal"
      select
      slotProps={{ select: { multiple: true } }}
      label={field.label ?? field.name}
      defaultValue={Array.isArray(field.defaultValue) ? field.defaultValue : []}
      helperText={field.description}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label ?? opt.value}
        </MenuItem>
      ))}
    </TextField>
  );
};
