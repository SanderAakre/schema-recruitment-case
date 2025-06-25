import React, { useState } from "react";

// MUI components
import { Box, Typography } from "@mui/material";

// Custom components
import SchemaPage from "./SchemaPage";
import TextComp from "@/components/TextComp";

// Types/interfaces
import type { SchemaData } from "@/types";

interface Props {
  schema: SchemaData;
}

const SchemaForm = ({ schema }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Box className={schema.tailwindClasses}>
      {schema.title && <TextComp data={schema.title} />}
      {schema.subText && <TextComp data={schema.subText} />}
      {schema.pages && schema.pages.length > 0 ? (
        schema.pages.map((page, index) => (
          <Box key={index} mb={2}>
            <SchemaPage page={page} />
          </Box>
        ))
      ) : (
        <Box mb={2}>
          <Typography variant="body1">No pages available in this schema.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SchemaForm;
