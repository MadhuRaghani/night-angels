import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getCartPriceDetails } from "../../services/CartServices";
import "../order/Order.css";
import ConfettiCelebration from "../confettiCelebration/ConfettiCelebration";

function Order() {
  const { order } = useContext(CartContext);
  const { totalItems, totalOriginalPrice, totalPrice } =
    getCartPriceDetails(order);
  const totalDiscount = totalOriginalPrice - totalPrice;

  return (
    <div className="order-page-div">
      <ConfettiCelebration />
      <div className="order-summary-div">
        <div>
          <h3>Order Details: ({totalItems} Items)</h3>
        </div>
        {order.map(({ id, title, qty, price }) => (
          <div key={id} className="price-details-div">
            <p>{`${title} - (${qty})`}</p>
            <p className="price-tag-p">{price * qty}</p>
          </div>
        ))}
        <div className="price-details-div">
          <p className="total-amount-tag">Total Amount Paid</p>
          <div className="price-and-original-price-div">
            <p className="price-tag-p original-price-tag">
              {totalOriginalPrice}
            </p>
            <p className="price-tag-p total-amount-tag">{totalPrice}</p>
          </div>
        </div>
        <div className="discount-div">
          Yayyyyy! You saved{" "}
          <span className="price-tag-p">{totalDiscount}/-</span>
        </div>
      </div>
    </div>
  );
}

export default Order;
