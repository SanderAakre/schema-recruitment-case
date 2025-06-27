import { useState, useRef } from "react";

// MUI components
import { Box, Typography, Stack, Divider } from "@mui/material";

// Custom components
import SchemaPage from "./SchemaPage";
import type { SchemaPageHandle } from "./SchemaPage";
import ButtonComp from "@/components/ButtonComp";
import TextComp, { TitleComp } from "@/components/TextComp";

// Types/interfaces
import type { SchemaData, PageValues } from "@/types";

interface Props {
  schema: SchemaData;
}

/**
 * Renders a multi-page form based on a schema definition.
 * Allows users to navigate through pages, validate fields, and submit the form.
 * @param {Object} props - The properties for the SchemaForm component.
 * @param {SchemaData} props.schema - The schema data containing pages, title, subText, and buttons.
 * @returns {JSX.Element} The rendered SchemaForm component.
 */
const SchemaForm = ({ schema }: Props) => {
  const [formData, setFormData] = useState<PageValues[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef<SchemaPageHandle>(null);
  const pages = schema.pages ?? [];
  const isLast = currentPage === pages.length - 1;
  const isFirst = currentPage === 0;

  const handleNext = () => {
    if (pageRef.current?.validateAllFields()) {
      setCurrentPage((p) => p + 1);
    }
  };

  const handleSubmit = () => {
    if (pageRef.current?.validateAllFields()) {
      console.log("Final Form Data:", formData);
      alert("Form submitted!");
    }
  };

  return (
    <Box id="Schema container root">
      {schema.title && (
        <Box mb={2} display="flex" justifyContent="center">
          <TitleComp data={schema.title} />
        </Box>
      )}
      {schema.subText && (
        <Box mb={2}>
          <TextComp data={schema.subText} centerText />
        </Box>
      )}
      {schema.title || schema.subText ? <Divider sx={{ mb: 2 }} /> : null}

      {pages[currentPage] ? (
        <Box mb={4}>
          <SchemaPage
            ref={pageRef}
            page={pages[currentPage]}
            onPageValidated={(validatedPageData) => {
              setFormData((prev) => {
                const updated = prev.filter((p) => p.pageName !== validatedPageData.pageName);
                return [...updated, validatedPageData];
              });
            }}
          />
        </Box>
      ) : (
        <Typography>No pages</Typography>
      )}
      <Divider sx={{ mb: 2 }} />
      <Stack direction="row" spacing={2} m={4} justifyContent="space-evenly">
        {!isFirst && <ButtonComp data={schema.previousPageButton} onClick={() => setCurrentPage((p) => p - 1)} />}
        {!isLast ? <ButtonComp data={schema.nextPageButton} onClick={handleNext} /> : <ButtonComp data={schema.submitButton} onClick={handleSubmit} />}
      </Stack>
    </Box>
  );
};

export default SchemaForm;
