import React from "react";

// MUI components
import { Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Custom components
import TextComp, { GroupTitleComp } from "@/components/TextComp";

// Types/interfaces
import type { GroupData } from "@/types";

interface Props {
  group: GroupData;
  children: React.ReactNode;
}

const FieldGroup: React.FC<Props> = ({ group, children }) => {
  if (group.collapsable) {
    return (
      <Accordion
        id={`Field group: ${group.name}`}
        defaultExpanded={!group.startCollapsed}
        sx={{ borderRadius: 2 }}
        className={group.tailwindClasses}
        disableGutters
        square
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <GroupTitleComp data={group.title ?? group.name} />
        </AccordionSummary>
        <AccordionDetails>
          {group.subText && <TextComp data={group.subText} />}
          {children}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box mt={2} mx={2}>
      <GroupTitleComp data={group.title ?? group.name} />
      {group.subText && <TextComp data={group.subText} />}
      {children}
    </Box>
  );
};

export default FieldGroup;
