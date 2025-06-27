import React, { useState } from "react";

// MUI components
import { Box, IconButton, Collapse, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Custom components
import TextComp, { GroupTitleComp } from "@/components/TextComp";

// Types/interfaces
import type { GroupData } from "@/types";

interface Props {
  group: GroupData;
  children: React.ReactNode;
}

/**
 * FieldGroup is a reusable component that renders a group of fields with optional collapsible functionality.
 * It supports different gap sizes and can display a title and subtext.
 * @param {Object} props - The properties for the FieldGroup component.
 * @param {GroupData} props.group - The group data containing title, subText, and other properties.
 * @param {React.ReactNode} props.children - The child components to be rendered within the group.
 * @returns {JSX.Element} The rendered FieldGroup component.
 */
const FieldGroup: React.FC<Props> = ({ group, children }) => {
  const [open, setOpen] = useState(!group.startCollapsed);

  const toggle = () => setOpen((prev) => !prev);

  const gapSize = group.gapSize === "tight" ? 0 : group.gapSize === "half" ? 2 : group.gapSize === "normal" ? 4 : group.gapSize === "wide" ? 6 : 0;

  if (group.collapsable) {
    return (
      <Paper className={group.tailwindClasses} id={`Field group: ${group.name}`} sx={{ borderRadius: 2, p: 2, bgcolor: "background.paper" }}>
        <Box
          onClick={toggle}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
          id={`Field group: ${group.name} title root`}
          sx={{ cursor: "pointer" }}
        >
          <IconButton size="small">{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          {group.title && <GroupTitleComp data={group.title} />}
        </Box>
        <Collapse in={open}>
          <Box mt={1} display="flex" flexDirection="column">
            {group.subText && (
              <Box mb={1} id={`Field group: ${group.name} subtext root`}>
                <TextComp data={group.subText} />
              </Box>
            )}
            <Box display="flex" flexDirection="column" gap={gapSize}>
              {children}
            </Box>
          </Box>
        </Collapse>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, bgcolor: "background.paper" }} className={group.tailwindClasses}>
      <Box display="flex" flexDirection="column" id={`Field group: ${group.name}`} p={2}>
        <Box display="flex" flexDirection="column" mb={1} gap={1} id={`Field group: ${group.name} title root`}>
          <GroupTitleComp data={group.title ?? group.name} />
          {group.subText && <TextComp data={group.subText} />}
        </Box>
        <Box display="flex" flexDirection="column" gap={gapSize}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default FieldGroup;
