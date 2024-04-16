import { Button } from "@mui/material";
import styles from "components/Button/Button.module.css";

interface IButton {
  title: string;
  onClick: () => void;
}

const ButtonComponent = ({ title, onClick }: IButton) => {
  return (
    <div>
      <Button onClick={onClick} size="small" className={styles.button}>
        {title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
