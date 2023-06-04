import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartProductCard from "./CartProductCard";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-page-div">
      <div className="all-products-div-cart">
        <h2>My Cart({cart.length})</h2>
        {cart.map((eachProduct) => (
          <CartProductCard product={eachProduct} key={eachProduct._id} />
        ))}
      </div>
      <div>Checkout Part</div>
    </div>
  );
}

export default Cart;
