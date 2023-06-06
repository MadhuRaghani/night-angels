import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getCartPriceDetails } from "../../services/CartServices";
import { useNavigate } from "react-router-dom";

function CheckoutDetails({ cartOrCheckout }) {
  const { cart } = useContext(CartContext);
  const { totalItems, totalOriginalPrice, totalPrice } =
    getCartPriceDetails(cart);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const navigate = useNavigate();

  return (
    <div className="checkout-details-div">
      <div>
        <h3>Price Details: ({totalItems} Items)</h3>
      </div>
      {cart.map(({ id, title, qty, price }) => (
        <div key={id} className="price-details-div">
          <p>{`${title} - (${qty})`}</p>
          <p className="price-tag-p">{price * qty}</p>
        </div>
      ))}
      <div className="price-details-div">
        <p className="total-amount-tag">Total Amount</p>
        <div className="price-and-original-price-div">
          <p className="price-tag-p original-price-tag">{totalOriginalPrice}</p>
          <p className="price-tag-p total-amount-tag">{totalPrice}</p>
        </div>
      </div>
      <button
        className="checkout-btn cursor-pointer"
        onClick={() => {
          cartOrCheckout === "cart" && navigate("/checkout");
        }}
      >
        {cartOrCheckout === "cart" ? "Checkout" : "Place Order"}
      </button>
      <div className="discount-div">
        Yayyyyy! You save <span className="price-tag-p">{totalDiscount}/-</span>
      </div>
    </div>
  );
}

export default CheckoutDetails;
