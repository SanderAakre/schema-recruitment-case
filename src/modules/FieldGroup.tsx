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

const FieldGroup: React.FC<Props> = ({ group, children }) => {
  const [open, setOpen] = useState(!group.startCollapsed);

  const toggle = () => setOpen((prev) => !prev);

  if (group.collapsable) {
    return (
      <Paper className={group.tailwindClasses} id={`Field group: ${group.name}`} sx={{ borderRadius: 2, p: 2, bgcolor: "background.paper" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <GroupTitleComp data={group.title ?? group.name} />
          <IconButton onClick={toggle} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={open}>
          {group.subText && <TextComp data={group.subText} />}
          {children}
        </Collapse>
      </Paper>
    );
  }

  return (
    <Box px={2} className={group.tailwindClasses}>
      <GroupTitleComp data={group.title ?? group.name} />
      {group.subText && <TextComp data={group.subText} />}
      {children}
    </Box>
  );
};

export default FieldGroup;
