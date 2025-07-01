import { useState, useRef, useEffect } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    pageRef.current?.validateAllFields(); // This triggers onPageValidated
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const allPageNames = pages.map((p) => p.name).filter((name): name is string => typeof name === "string");
    const validatedNames = formData.map((p) => p.pageName).filter((name): name is string => typeof name === "string");

    const allPresent = allPageNames.every((name) => validatedNames.includes(name));

    if (allPresent) {
      setIsSubmitting(false);
      console.group("Final Form Submission");

      formData.forEach((page) => {
        console.group(`Page: ${page.pageName}`);
        page.fields.forEach((field) => {
          console.log(`${field.fieldName}:`, field.value);
        });
        console.groupEnd();
      });
      console.groupEnd();

      console.log("Raw formData object:", formData);

      alert("Form submitted! Check console for data.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isSubmitting]);

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
