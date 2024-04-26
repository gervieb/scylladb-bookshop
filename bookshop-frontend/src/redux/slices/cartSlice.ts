import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "src/types/cart";

const initialState: CartState = {
  cartData: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartData(state, action) {
      state.cartData = action.payload;
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export const { setCartData, setIsCartOpen } = cartSlice.actions;
export default cartSlice.reducer;
