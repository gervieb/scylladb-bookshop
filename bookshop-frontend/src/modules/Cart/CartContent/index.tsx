import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ICart } from "src/types/cart";
import ButtonComponent from "src/components/Button";
import styles from "src/modules/Cart/CartContent/CartContent.module.css";
import { setCartData } from "src/redux/slices/cartSlice";

type Errors = { [key: string]: string };

type SetErrorsType = (errors: Errors) => void;

interface ICartProps {
  cartData: ICart[];
  isCartOpen: boolean;
  errors: { [key: string]: string };
  setErrors: SetErrorsType;
  onRemove: (id: string) => void;
}

const CartContent = ({
  cartData,
  isCartOpen,
  errors,
  setErrors,
  onRemove,
}: ICartProps) => {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState<ICart[]>([]);
  const [currency, setCurrency] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [updatedCarts, setUpdatedCarts] = useState<{ [key: string]: boolean }>(
    {}
  );

  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    setCarts(cartData);
    setErrors({});
  }, [cartData, isCartOpen]);

  useEffect(() => {
    if (carts?.length > 0) {
      let currencyCode;
      const price = carts.reduce((acc: number, curr: ICart) => {
        currencyCode = curr.saleInfo?.retailPrice.currencyCode as string;
        if (curr && curr.saleInfo && curr.saleInfo.retailPrice) {
          return acc + curr.saleInfo.retailPrice.amount * curr.qty;
        }
        return acc;
      }, 0);
      if (currencyCode) setCurrency(currencyCode as string);
      setTotalPrice(price);
    }
  }, [carts]);

  const isValidQuantity = (value: number) => {
    if (value === 0 || value > 100) {
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setErrors({});
    const { value } = e.target;
    const parsedValue = parseInt(value, 10);
    if (!isValidQuantity(parsedValue)) {
      setErrors({ ...errors, [id]: "Sorry! Number invalid" });
    }
    const index = carts.findIndex((cartItem: ICart) => cartItem.id === id);
    const updatedCarts = carts.map((cartItem, idx) => {
      if (idx === index) {
        return { ...cartItem, qty: parsedValue };
      }
      return cartItem;
    });
    setCarts(updatedCarts);
  };

  const onUpdate = (id: string) => {
    const hasNoError = !errors[id];
    if (hasNoError) {
      dispatch(setCartData(carts));
      setErrors({});
      setUpdatedCarts({ ...updatedCarts, [id]: true });

      setTimeout(() => {
        setUpdatedCarts({ ...updatedCarts, [id]: false });
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      {carts?.map((cart, idx) => (
        <div key={`${cart.id}-${idx}`}>
          <div className={styles.cartContainer}>
            <div className={styles.flexContainer}>
              <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
                {cart.volumeInfo.title}
              </Typography>
              <div
                className={styles.closeBtn}
                onClick={() => onRemove(cart.id)}
              >
                <CloseIcon fontSize="small" />
              </div>
            </div>
            <TextField
              value={cart.qty}
              size="small"
              type="number"
              placeholder="Enter quantity"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, cart.id)
              }
              sx={{ mt: 1 }}
            />
            <ButtonComponent
              variant="contained"
              size="small"
              title="Update Quantity"
              onClick={() => onUpdate(cart.id)}
              sx={{ mt: 2, textTransform: "capitalize" }}
            />
            {errors[cart.id] && (
              <Typography mt={1} sx={{ color: "red", fontSize: "12px" }}>
                {errors[cart.id]}
              </Typography>
            )}
            {updatedCarts[cart.id] && (
              <Typography mt={1} sx={{ color: "green", fontSize: "12px" }}>
                Quantity updated!
              </Typography>
            )}
          </div>
          {idx === carts.length - 1 &&
            !Number.isNaN(totalPrice) &&
            !hasErrors && (
              <Typography variant="subtitle2">
                Total Price:{" "}
                <strong>{`${currency} ${totalPrice.toFixed(2)}`}</strong>
              </Typography>
            )}
        </div>
      ))}
    </div>
  );
};

export default CartContent;
