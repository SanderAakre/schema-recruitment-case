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

/**
 * Reusable confirmation dialog component that prompts the user for confirmation before performing an action.
 * Supports customization of the title, subtext, and button texts.
 * @param {Object} props - The properties for the ConfirmComp component.
 * @param {ConfirmationData} [props.data] - Optional data for confirmation dialog customization.
 * @param {boolean} props.open - Whether the dialog is open or not.
 * @param {Function} props.onConfirm - Callback function to be called when the user confirms the action.
 * @param {Function} props.onCancel - Callback function to be called when the user cancels the action.
 * @returns {JSX.Element | null} The rendered confirmation dialog component or null if not in use.
 */
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
      <DialogContent>{subText && <TextComp data={subText} />}</DialogContent>
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
