import React, { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import AddressCard from "../checkout/AddressCard";
import NewAddress from "../checkout/NewAddress";

function ManageAddress() {
  const { addresses } = useContext(AddressContext);

  return (
    <div className="checkout-page-div">
      <div className="manage-address-div">
        {addresses.map((eachAddress) => (
          <AddressCard address={eachAddress} />
        ))}
        <NewAddress />
      </div>
    </div>
  );
}

export default ManageAddress;
