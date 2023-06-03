import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import ProductCard from "../products/ProductCard";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="all-products-div">
      {cart.map((eachProduct) => (
        <ProductCard product={eachProduct} key={eachProduct._id} />
      ))}
    </div>
  );
}

export default Cart;
