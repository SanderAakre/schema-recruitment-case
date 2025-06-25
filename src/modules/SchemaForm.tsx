import React, { useState } from "react";

// MUI components
import { Box, Typography } from "@mui/material";

// Custom components
import SchemaPage from "./SchemaPage";
import TextComp, { TitleComp } from "@/components/TextComp";

// Types/interfaces
import type { SchemaData } from "@/types";

interface Props {
  schema: SchemaData;
}

const SchemaForm = ({ schema }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Box id={"Schema container root"} className={schema.tailwindClasses}>
      {schema.title && (
        <Box mb={2} id={"Schema title root"}>
          <TitleComp data={schema.title} />
        </Box>
      )}
      {schema.subText && (
        <Box mb={2} id={"Schema subtext root"}>
          <TextComp data={schema.subText} />
        </Box>
      )}
      {schema.pages && schema.pages.length > 0 ? (
        schema.pages.map((page, index) => (
          <Box key={index} mb={2} id={`Page ${index + 1} root`}>
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
