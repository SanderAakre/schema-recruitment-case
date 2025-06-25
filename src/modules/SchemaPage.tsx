// MUI components
import { Box } from "@mui/material";

// Custom components
import SchemaField from "./SchemaField";
import FieldGroup from "./FieldGroup";

// Types/interfaces
import type { PageData, FieldData, GroupData } from "../types";

interface Props {
  page: PageData;
}

const SchemaPage = ({ page }: Props) => {
  const fields = page.fields;
  const groups = page.fieldGroup ?? [];

  // Order the fields into groups if they exist
  const schemaContent: (FieldData | { group: GroupData; fields: FieldData[] })[] = [];
  fields.forEach((field) => {
    if (field.groupName) {
      // Check if the group already exists
      const existingGroup = schemaContent.find((item) => typeof item === "object" && "group" in item && item.group.name === field.groupName);
      if (!existingGroup) {
        // If the group does not exist, create a new group entry
        const group: GroupData = groups.find((g) => g.name === field.groupName) || { name: field.groupName };
        schemaContent.push({ group, fields: [field] });
      } else {
        // If the group exists, add the field to it
        (existingGroup as { group: GroupData; fields: FieldData[] }).fields.push(field);
      }
    } else {
      // If no group, just add the field directly
      schemaContent.push(field);
    }
  });

  return (
    <Box component="form">
      {typeof page.title === "string" && (
        <Box mb={2}>
          <h1>{page.title}</h1>
        </Box>
      )}
      {typeof page.subText === "string" && (
        <Box mb={2}>
          <p>{page.subText}</p>
        </Box>
      )}
      {schemaContent.map((item, index) => {
        if (typeof item === "object" && "group" in item) {
          // Render a field group
          return (
            <FieldGroup key={index} group={item.group}>
              {item.fields.map((field) => (
                <SchemaField key={field.name} field={field} />
              ))}
            </FieldGroup>
          );
        } else {
          // Render a single field
          return <SchemaField key={(item as FieldData).name} field={item as FieldData} />;
        }
      })}
    </Box>
  );
};

export default SchemaPage;
