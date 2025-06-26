import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { Box } from "@mui/material";
import SchemaField from "./SchemaField";
import type { SchemaFieldHandle } from "./SchemaField";
import FieldGroup from "./FieldGroup";
import TextComp, { PageTitleComp } from "@/components/TextComp";

import type { PageData, FieldData, GroupData, PageValues, FieldValue } from "@/types";

interface Props {
  page: PageData;
  onPageValidated?: (validatedPageData: PageValues) => void;
}

export interface SchemaPageHandle {
  validateAllFields: () => boolean;
}

/** SchemaPage is a component that renders a page of fields, handling validation and layout.
 * It organizes fields into groups if specified and allows for validation of all fields on the page.
 * @param {Object} props - The properties for the SchemaPage component.
 * @param {PageData} props.page - The page data containing fields, groups, and layout information.
 * @returns {JSX.Element} The rendered SchemaPage component.
 */
const SchemaPage = forwardRef<SchemaPageHandle, Props>(({ page, onPageValidated }, ref) => {
  const fieldRefs = useRef<Record<string, React.RefObject<SchemaFieldHandle | null>>>({});

  const fields = page.fields;
  const groups = page.fieldGroups ?? [];

  // Ensure all refs exist
  fields.forEach((field) => {
    if (!fieldRefs.current[field.name]) {
      fieldRefs.current[field.name] = React.createRef<SchemaFieldHandle>();
    }
  });

  useImperativeHandle(ref, () => ({
    validateAllFields: () => {
      const validatedFields = fields
        .map((field) => {
          const fieldRef = fieldRefs.current[field.name];
          return fieldRef?.current?.validate?.();
        })
        .filter(Boolean); // remove any undefined

      const allValid = (validatedFields as FieldValue[]).every((f) => f.valid);

      // Call onPageValidated with the collected data
      if (onPageValidated) {
        onPageValidated({
          pageName: page.name ?? `page-${Date.now()}`, // fallback if name missing
          fields: validatedFields.filter((f): f is FieldValue => !!f),
        });
      }

      return allValid;
    },
  }));

  const gapSize = page.gapSize === "tight" ? 0 : page.gapSize === "half" ? 2 : page.gapSize === "normal" ? 4 : page.gapSize === "wide" ? 6 : 4;

  const schemaContent: (FieldData | { group: GroupData; fields: FieldData[] })[] = [];

  fields.forEach((field) => {
    if (field.groupName) {
      const existing = schemaContent.find((item) => "group" in item && item.group.name === field.groupName);
      if (existing && "fields" in existing) {
        existing.fields.push(field);
      } else {
        const group = groups.find((g) => g.name === field.groupName) || { name: field.groupName };
        schemaContent.push({ group, fields: [field] });
      }
    } else {
      schemaContent.push(field);
    }
  });

  return (
    <Box className={page.tailwindClasses}>
      {page.title && (
        <Box mb={1}>
          <PageTitleComp data={page.title} />
        </Box>
      )}
      {page.subText && (
        <Box mb={1}>
          <TextComp data={page.subText} />
        </Box>
      )}
      <Box pt={3} gap={gapSize} display="flex" flexDirection="column" id={`Page ${page.name || "unnamed"} root`}>
        {schemaContent.map((item, index) => {
          if ("group" in item) {
            return (
              <FieldGroup key={index} group={item.group}>
                {item.fields.map((field) => (
                  <SchemaField key={field.name} field={field} ref={fieldRefs.current[field.name]} />
                ))}
              </FieldGroup>
            );
          } else {
            const field = item as FieldData;
            return <SchemaField key={field.name} field={field} ref={fieldRefs.current[field.name]} />;
          }
        })}
      </Box>
    </Box>
  );
});

export default SchemaPage;
