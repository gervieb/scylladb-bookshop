import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setIsCartOpen } from "src/redux/slices/cartSlice";
import styles from "src/components/Header/Header.module.css";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { cartData, isCartOpen } = useSelector(
    (state: RootState) => state.cart
  );

  const handleCart = () => {
    if (cartData?.length > 0) {
      dispatch(setIsCartOpen(!isCartOpen));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Typography variant="h5">ScyllaDB Bookshop</Typography>
        <Typography
          variant="subtitle2"
          className={styles.cart}
          onClick={handleCart}
        >
          My Cart ({cartData.length})
        </Typography>
      </div>
    </div>
  );
};

export default HeaderComponent;
