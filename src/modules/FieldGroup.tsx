import React from "react";

// MUI components
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Types/interfaces
import type { GroupData } from "../types";

interface Props {
  group: GroupData;
  children: React.ReactNode;
}

const FieldGroup: React.FC<Props> = ({ group, children }) => {
  if (group.collapsable) {
    return (
      <Accordion defaultExpanded={!group.startCollapsed}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{group.label ?? group.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box mt={2} mx={2}>
      <Typography variant="h6">{group.label ?? group.name}</Typography>
      {children}
    </Box>
  );
};

export default FieldGroup;
