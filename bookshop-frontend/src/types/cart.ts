import { IBook } from "src/types/book";

export interface ICart extends IBook {
  qty: number;
}

export type CartState = {
  cartData: ICart[];
  isCartOpen: boolean;
};
