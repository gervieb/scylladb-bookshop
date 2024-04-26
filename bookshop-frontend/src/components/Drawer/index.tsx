import { ReactNode } from "react";
import { IconButton, Typography } from "@mui/material";
import styles from "src/components/Drawer/Drawer.module.css";

interface IDrawer {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = ({ children, isOpen, onClose }: IDrawer) => {
  return (
    <div className={`${isOpen ? "" : styles.cartClose} ${styles.container}`}>
      <div className={styles.closeBtn}>
        <IconButton size="small" edge="end" onClick={onClose}>
          <Typography variant="body2">Close</Typography>
        </IconButton>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Drawer;
