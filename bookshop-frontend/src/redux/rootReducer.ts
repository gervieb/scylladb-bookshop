import { combineReducers } from "redux";
import cartReducer from "src/redux/slices/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
