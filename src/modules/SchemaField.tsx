import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import type { FieldData } from "../types";

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
      return <FormControlLabel control={<Checkbox defaultChecked={!!field.defaultValue} />} label={field.label ?? field.name} />;
    default:
      return null;
  }
};

export default SchemaField;
