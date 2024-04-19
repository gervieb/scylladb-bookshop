import { Button, SxProps } from "@mui/material";

interface IButton {
  title: string;
  onClick: () => void;
  sx?: SxProps;
}

const ButtonComponent = ({ title, onClick, sx }: IButton) => {
  return (
    <div>
      <Button onClick={onClick} size="small" sx={sx}>
        {title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
