// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

// Custom components
import TextComp from "./TextComp";

// Types/interfaces
import type { ConfirmationData } from "@/types";

interface Props {
  data?: ConfirmationData;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmComp = ({ data, open, onConfirm, onCancel }: Props) => {
  const { use = true, title = "Are you sure?", subText, confirmButton = "Confirm", cancelButton = "Cancel", tailwindClasses } = data ?? {};

  if (!use) return null;

  const confirmText = typeof confirmButton === "string" ? confirmButton : confirmButton.text ?? "Confirm";
  const cancelText = typeof cancelButton === "string" ? cancelButton : cancelButton.text ?? "Cancel";

  return (
    <Dialog open={open} onClose={onCancel} className={tailwindClasses}>
      <DialogTitle>
        <TextComp data={title} />
      </DialogTitle>
      <DialogContent>
        <TextComp data={subText} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button variant="contained" onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmComp;
