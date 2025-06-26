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

  const gapSize = group.gapSize === "tight" ? 0 : group.gapSize === "half" ? 2 : group.gapSize === "normal" ? 4 : group.gapSize === "wide" ? 6 : 0;

  if (group.collapsable) {
    return (
      <Paper className={group.tailwindClasses} id={`Field group: ${group.name}`} sx={{ borderRadius: 2, p: 2, bgcolor: "background.paper" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box id={`Field group: ${group.name} title root`}>
            <GroupTitleComp data={group.title ?? group.name} />
          </Box>
          <IconButton onClick={toggle} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={open}>
          <Box mt={1} gap={gapSize}>
            {group.subText && (
              <Box mb={1} id={`Field group: ${group.name} subtext root`}>
                <TextComp data={group.subText} />
              </Box>
            )}
            {children}
          </Box>
        </Collapse>
      </Paper>
    );
  }

  return (
    <Box display="flex" flexDirection="column" id={`Field group: ${group.name}`} pl={1} className={group.tailwindClasses}>
      <Box display="flex" flexDirection="column" mb={1} gap={1} id={`Field group: ${group.name} title root`}>
        <GroupTitleComp data={group.title ?? group.name} />
        {group.subText && <TextComp data={group.subText} />}
      </Box>
      <Box display="flex" flexDirection="column" gap={gapSize}>
        {children}
      </Box>
    </Box>
  );
};

export default FieldGroup;
