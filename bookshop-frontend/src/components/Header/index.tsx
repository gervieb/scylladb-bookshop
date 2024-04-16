import { useState } from "react";
import styles from "components/Header/Header.module.css";
import { Typography } from "@mui/material";

const HeaderComponent = () => {
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Typography variant="h5">ScyllaDB Bookshop</Typography>
        <Typography variant="subtitle2" onClick={() => setShowCart(!showCart)}>
          My Cart
        </Typography>
      </div>
    </div>
  );
};

export default HeaderComponent;
