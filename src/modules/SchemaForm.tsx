import { Box } from "@mui/material";
import type { SchemaData } from "../types";
import SchemaPage from "./SchemaPage";

interface Props {
  schema: SchemaData;
}

const SchemaForm = ({ schema }: Props) => {
  return (
    <Box component="form">
      {typeof schema.title === "string" && (
        <Box mb={2}>
          <h1>{schema.title}</h1>
        </Box>
      )}
      {typeof schema.subText === "string" && (
        <Box mb={2}>
          <p>{schema.subText}</p>
        </Box>
      )}
      <Box>
        {schema.page.map((page, index) => (
          <SchemaPage key={index} page={page} />
        ))}
      </Box>
    </Box>
  );
};

export default SchemaForm;
