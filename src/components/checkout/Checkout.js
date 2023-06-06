import React, { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import AddressCard from "./AddressCard";
import CheckoutDetails from "../cart/CheckoutDetails";
import NewAddress from "./NewAddress";

function Checkout() {
  const { addresses } = useContext(AddressContext);

  return (
    <div className="checkout-page-div">
      <div className="all-products-div-cart">
        {addresses.map((eachAddress) => (
          <AddressCard address={eachAddress} />
        ))}
        <NewAddress />
      </div>
      <CheckoutDetails cartOrCheckout={"checkout"} />
    </div>
  );
}

export default Checkout;
