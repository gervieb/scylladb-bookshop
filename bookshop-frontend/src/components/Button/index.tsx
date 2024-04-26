import { Button, SxProps, ButtonProps } from "@mui/material";
import styles from "src/components/Button/Button.module.css";

interface IButton extends ButtonProps {
  title: string;
  onClick: () => void;
  sx?: SxProps;
}

const ButtonComponent = ({ title, onClick, sx, ...rest }: IButton) => {
  return (
    <div>
      <Button
        onClick={onClick}
        size="small"
        className={styles.button}
        sx={{
          backgroundColor: "#627254",
          border: "1px solid #627254",
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: 600,
          width: "100%",
          cursor: "pointer",
          ":hover": {
            borderColor: "transparent",
            backgroundColor: "#76885B",
          },
          ...sx,
        }}
        {...rest}
      >
        {title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
