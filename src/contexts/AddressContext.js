import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const AddressContext = createContext();

export default function AddressContextProvider({ children }) {
  const [addresses, setAddresses] = useState([
    {
      id: uuid(),
      name: "Madhu Raghani",
      street: "502, Birla Vanya, Near Hemraj Diary, Gol Maidan",
      city: "Kalyan",
      state: "Maharashtra",
      zipCode: "421301",
      phone: "9310727808",
      alternate_phone: "9826479564",
    },
    {
      id: uuid(),
      name: "Minnie Mouse",
      street: "Disney Land",
      city: "California",
      state: "Anaheim",
      zipCode: "928021",
      phone: "1234567890",
      alternate_phone: "0123456789",
    },
  ]);
  const [defaultAddressId, setDefaultAddressId] = useState(addresses[0].id);

  const addAnAddress = (address) => {
    setAddresses([...addresses, address]);
    toast.success("Added A New Address");
  };

  const deleteAnAddress = (idForDeletingAddress) => {
    if (addresses.length > 1) {
      const filteredAddresses = addresses.filter(
        ({ id }) => id !== idForDeletingAddress
      );
      if (defaultAddressId === idForDeletingAddress) {
        setDefaultAddressId(filteredAddresses[0].id);
        toast.success("Changed Default Address");
      }
      setAddresses(filteredAddresses);
      toast.success("Deleted An address");
    } else {
      toast.error("Need Atleast one Address");
    }
  };

  const setANewDefaultAddress = (id) => {
    setDefaultAddressId(id);
    toast.success("Changed Default Address");
  };

  const editAnAddress = (id, newAddress) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { id, ...newAddress } : address
      )
    );
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAnAddress,
        deleteAnAddress,
        defaultAddressId,
        setANewDefaultAddress,
        editAnAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
