// MUI components
import { Button } from "@mui/material";

// Types/interfaces
import type { ButtonData } from "@/types";

interface Props {
  data?: ButtonData;
  preset?: "next" | "previous" | "submit";
  onClick?: () => void;
}

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
