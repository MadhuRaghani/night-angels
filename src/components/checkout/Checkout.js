import React, { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import AddressCard from "./AddressCard";
import CheckoutDetails from "../cart/CheckoutDetails";
import NewAddress from "./NewAddress";

function Checkout() {
  const { addresses } = useContext(AddressContext);

  return (
    <div className="wishlist-cart-page-div">
      <div className="checkout-page-div">
        <div className="manage-address-div">
          {addresses.map((eachAddress) => (
            <AddressCard address={eachAddress} />
          ))}
          <NewAddress />
        </div>
        <CheckoutDetails cartOrCheckout={"checkout"} />
      </div>
    </div>
  );
}

export default Checkout;
