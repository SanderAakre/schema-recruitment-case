// MUI components
import { Button } from "@mui/material";

// Types/interfaces
import type { ButtonData } from "@/types";

interface Props {
  data?: ButtonData;
  onClick?: () => void;
}

const ButtonComp = ({ data, onClick }: Props) => {
  const { text = "Next", type = "contained", tailwindClasses } = data ?? {};

  return (
    <Button className={tailwindClasses} variant={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonComp;
