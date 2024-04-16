import React from "react";

interface ICart {
  cart: {
    price: number;
    qty: number;
  }[];
}

const Cart = ({ cart }: ICart) => {
  return <div>Cart</div>;
};

export default Cart;
