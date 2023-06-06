import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { AddressContext } from "../../contexts/AddressContext";

function NewAddress() {
  const { addAnAddress } = useContext(AddressContext);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);

  const clearAddressObj = {
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    alternate_phone: "",
  };

  const dummyValuesObj = {
    name: "Mickey Mouse",
    street: "Disney Land",
    city: "California",
    state: "Anaheim",
    zipCode: "928021",
    phone: "1234567890",
    alternate_phone: "0123456789",
  };

  const [newAddress, setNewAddress] = useState({
    id: uuid(),
    ...clearAddressObj,
  });

  const onAddressDataChangeHandler = (event, field) => {
    setNewAddress({ ...newAddress, [field]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addAnAddress(newAddress);
    setNewAddress({ id: uuid(), ...clearAddressObj });
    setAddNewAddressClick(false);
  };

  return addNewAddressClick ? (
    <div className="add-new-address-form">
      <h2>Add New Address</h2>
      <form
        className="address-form"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          required
          value={newAddress.name}
          type="text"
          placeholder="Enter Name"
          onChange={(event) => {
            onAddressDataChangeHandler(event, "name");
          }}
        />
        <input
          required
          value={newAddress.street}
          type="text"
          placeholder="Enter Address"
          onChange={(event) => {
            onAddressDataChangeHandler(event, "street");
          }}
        />
        <input
          required
          value={newAddress.city}
          type="text"
          placeholder="Enter City"
          onChange={(event) => {
            onAddressDataChangeHandler(event, "city");
          }}
        />
        <input
          required
          value={newAddress.state}
          type="text"
          placeholder="Enter State"
          onChange={(event) => {
            onAddressDataChangeHandler(event, "state");
          }}
        />
        <input
          required
          value={newAddress.zipCode}
          type="text"
          placeholder="Enter Pincode"
          maxLength={6}
          onChange={(event) => {
            onAddressDataChangeHandler(event, "zipCode");
          }}
        />
        <input
          required
          value={newAddress.phone}
          type="text"
          placeholder="Enter Phone Number"
          maxLength={10}
          onChange={(event) => {
            onAddressDataChangeHandler(event, "phone");
          }}
        />
        <input
          required
          value={newAddress.alternate_phone}
          type="text"
          placeholder="Enter Alternate Phone Number"
          maxLength={10}
          onChange={(event) => {
            onAddressDataChangeHandler(event, "alternate_phone");
          }}
        />
        <div className="edit-address-div">
          <button type="submit">SAVE</button>
          <button
            type="button"
            onClick={() => {
              setNewAddress({ id: uuid(), ...clearAddressObj });
              setAddNewAddressClick(false);
            }}
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={() => {
              setNewAddress({ id: uuid(), ...dummyValuesObj });
            }}
          >
            DummyAddress
          </button>
        </div>
      </form>
    </div>
  ) : (
    <button
      className="add-new-address-btn cursor-pointer"
      onClick={() => {
        setAddNewAddressClick(true);
      }}
    >
      + Add New Address
    </button>
  );
}

export default NewAddress;
