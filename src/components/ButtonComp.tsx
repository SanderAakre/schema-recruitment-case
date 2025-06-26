// MUI components
import { Button } from "@mui/material";

// Types/interfaces
import type { ButtonData } from "@/types";

interface Props {
  data?: ButtonData;
  preset?: "next" | "previous" | "submit";
  onClick?: () => void;
}

/** ButtonComp is a reusable button component that can be customized with different styles and text.
 * It supports different presets for common actions like "next", "previous", and "submit".
 * The component uses Material-UI's Button component and accepts props for customization.
 * @param {Object} props - The properties for the button component.
 * @param {ButtonData} [props.data] - Optional data for button customization, including text, type, and tailwindClasses.
 * @param {string} [props.preset] - Optional preset for common button actions ("next", "previous", "submit").
 * @param {Function} [props.onClick] - Optional click handler for the button.
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonComp = ({ data, preset, onClick }: Props) => {
  const defaultButtonText = preset === "next" ? "Next" : preset === "previous" ? "Previous" : preset === "submit" ? "Submit" : "Click Me";
  const defaultType = preset === "next" || preset === "previous" ? "outlined" : "contained";

  const { text = defaultButtonText, type = defaultType, tailwindClasses } = data ?? {};

  return (
    <Button className={tailwindClasses} variant={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonComp;
