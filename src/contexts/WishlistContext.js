import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(AuthContext);

  const addToWishlistHandler = async (product) => {
    try {
      const response = await axios.post(
        "/api/user/wishlist",
        { product },
        { headers: { authorization: token } }
      );
      console.log(response);
      setWishlist(response.data.wishlist);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(wishlist);

  return (
    <>
      <WishlistContext.Provider
        value={{ wishlist, setWishlist, addToWishlistHandler }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
}
