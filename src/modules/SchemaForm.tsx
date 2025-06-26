import React, { useState } from "react";

// MUI components
import { Box, Typography, Stack } from "@mui/material";

// Custom components
import SchemaPage from "./SchemaPage";
import ButtonComp from "@/components/ButtonComp";
import TextComp, { TitleComp } from "@/components/TextComp";

// Types/interfaces
import type { SchemaData } from "@/types";

interface Props {
  schema: SchemaData;
}

const SchemaForm = ({ schema }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = schema.pages ?? [];
  const page = pages[currentPage];

  const isFirst = currentPage === 0;
  const isLast = currentPage === pages.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentPage((p) => p + 1);
  };

  const handlePrevious = () => {
    if (!isFirst) setCurrentPage((p) => p - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted (placeholder)"); // Replace with real logic later
  };

  return (
    <Box id="Schema container root" className={schema.tailwindClasses}>
      {schema.title && (
        <Box mb={2}>
          <TitleComp data={schema.title} />
        </Box>
      )}
      {schema.subText && (
        <Box mb={2}>
          <TextComp data={schema.subText} />
        </Box>
      )}

      {page ? (
        <Box mb={4}>
          <SchemaPage page={page} />
        </Box>
      ) : (
        <Typography>No pages available in this schema.</Typography>
      )}

      <Stack
        direction="row"
        spacing={2}
        m={4}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {!isFirst && <ButtonComp data={schema.previousPageButton} onClick={handlePrevious} />}

        {!isLast ? <ButtonComp data={schema.nextPageButton} onClick={handleNext} /> : <ButtonComp data={schema.submitButton} onClick={handleSubmit} />}
      </Stack>
    </Box>
  );
};

export default SchemaForm;
