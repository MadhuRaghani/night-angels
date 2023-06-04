import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getCartPriceDetails } from "../../services/CartServices";

function CheckoutDetails() {
  const { cart } = useContext(CartContext);
  const { totalItems, totalOriginalPrice, totalPrice } =
    getCartPriceDetails(cart);
  const totalDiscount = totalOriginalPrice - totalPrice;

  return (
    <div className="checkout-details-div">
      <div>
        <h3>Price Details: ({totalItems} Items)</h3>
      </div>
      <div className="price-details-div">
        <p>Total MRP</p>
        <p className="price-tag-p">{totalOriginalPrice}</p>
      </div>
      <div className="price-details-div">
        <p>Discount</p>
        <p className="price-tag-p">{totalDiscount}</p>
      </div>
      <div className="price-details-div total-amount-tag">
        <p>Total Amount</p>
        <p className="price-tag-p">{totalPrice}</p>
      </div>
      <button className="checkout-btn cursor-pointer">Checkout</button>
    </div>
  );
}

export default CheckoutDetails;
