import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartProductCard from "./CartProductCard";
import CheckoutDetails from "./CheckoutDetails";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <div>
        <h2>{cart.length > 0 ? `My Cart(${cart.length})` : "Cart is Empty"}</h2>
      </div>
      {cart.length > 0 && (
        <div className="cart-page-div">
          <div className="all-products-div-cart">
            {cart.map((eachProduct) => (
              <CartProductCard product={eachProduct} key={eachProduct._id} />
            ))}
          </div>
          <CheckoutDetails />
        </div>
      )}
    </div>
  );
}

export default Cart;
