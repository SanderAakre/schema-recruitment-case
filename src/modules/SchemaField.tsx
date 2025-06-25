import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import type { FieldData } from "@/types";

interface Props {
  field: FieldData;
}

const SchemaField = ({ field }: Props) => {
  switch (field.type ?? "text") {
    case "number":
    case "text":
      return (
        <TextField
          fullWidth
          margin="normal"
          type={field.type}
          label={field.label ?? field.name}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          helperText={field.description}
        />
      );
    case "boolean":
      return <FormControlLabel sx={{ width: "100%" }} control={<Checkbox defaultChecked={!!field.defaultValue} />} label={field.label ?? field.name} />;
    case "select":
      return <SelectField field={field} />;
    case "multiSelect":
      return <MultiSelectField field={field} />;
    case "comment":
      return (
        <TextField
          fullWidth
          margin="normal"
          type="text"
          label={field.label ?? field.name}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          helperText={field.description}
          multiline
          rows={4}
        />
      );
    default:
      return null;
  }
};

export default SchemaField;

const SelectField = ({ field }: Props) => {
  // Check what type of select field it is and render accordingly
};

const MultiSelectField = ({ field }: Props) => {
  // Render a multi-select field
};
