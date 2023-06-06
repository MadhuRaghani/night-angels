import { useContext, useState } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import "./Checkout.css";

const AddressCard = ({
  address: { id, name, street, city, state, zipCode, phone, alternate_phone },
}) => {
  const {
    defaultAddressId,
    setANewDefaultAddress,
    deleteAnAddress,
    editAnAddress,
  } = useContext(AddressContext);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    name,
    street,
    city,
    state,
    zipCode,
    phone,
    alternate_phone,
  });

  const onAddressEditHandler = (event, field) => {
    setEditedAddress({ ...editedAddress, [field]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editAnAddress(id, editedAddress);
    setEditingAddress(false);
  };

  return editingAddress ? (
    <div className="add-new-address-form">
      <form
        className="address-form"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          required
          value={editedAddress.name}
          type="text"
          placeholder="Enter Name"
          onChange={(event) => {
            onAddressEditHandler(event, "name");
          }}
        />
        <input
          required
          value={editedAddress.street}
          type="text"
          placeholder="Enter Address"
          onChange={(event) => {
            onAddressEditHandler(event, "street");
          }}
        />
        <input
          required
          value={editedAddress.city}
          type="text"
          placeholder="Enter City"
          onChange={(event) => {
            onAddressEditHandler(event, "city");
          }}
        />
        <input
          required
          value={editedAddress.state}
          type="text"
          placeholder="Enter State"
          onChange={(event) => {
            onAddressEditHandler(event, "state");
          }}
        />
        <input
          required
          value={editedAddress.zipCode}
          type="text"
          placeholder="Enter Pincode"
          maxLength={6}
          onChange={(event) => {
            onAddressEditHandler(event, "zipcode");
          }}
        />
        <input
          required
          value={editedAddress.phone}
          type="text"
          placeholder="Enter Phone Number"
          maxLength={10}
          onChange={(event) => {
            onAddressEditHandler(event, "phone");
          }}
        />
        <input
          required
          value={editedAddress.alternate_phone}
          type="text"
          placeholder="Enter Alternate Phone Number"
          maxLength={6}
          onChange={(event) => {
            onAddressEditHandler(event, "alternate_phone");
          }}
        />
        <div className="edit-address-div">
          <button type="submit">SAVE</button>
          <button
            type="button"
            onClick={() => {
              setEditingAddress(false);
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="address-card">
      <div className="address-details-div">
        <h4>{name}</h4>
        <p>{street}</p>
        <p>
          {city} - {zipCode}
        </p>
        <p>{state}</p>
        <p>
          <span>Phone:</span> {phone}
        </p>
        <p>
          <span>Alt. Phone:</span> {alternate_phone}
        </p>
      </div>
      <div className="edit-delete-address-btn-div">
        <button
          className="edit-delete-address-btn cursor-pointer"
          onClick={() => {
            setEditingAddress(true);
          }}
        >
          EDIT
        </button>
        <button
          className="edit-delete-address-btn cursor-pointer"
          onClick={() => {
            deleteAnAddress(id);
          }}
        >
          DELETE
        </button>
        {defaultAddressId === id ? (
          <label className="selected-label">DEFAULT ADDRESS</label>
        ) : (
          <button
            className="edit-delete-address-btn cursor-pointer"
            onClick={() => {
              setANewDefaultAddress(id);
            }}
          >
            SET AS DEFAULT
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
