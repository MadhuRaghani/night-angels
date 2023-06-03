import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [disableAddRemoveWishlistBtn, setDisableAddRemoveWishlistBtn] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/wishlist", {
          headers: { authorization: token },
        });
        if (response.status === 200) {
          setWishlist(response.data.wishlist);
        }
      } catch (err) {
        console.error("Error in Wishlist", err);
      }
    })();
  });

  const addToWishlistHandler = async (product) => {
    setDisableAddRemoveWishlistBtn(true);
    try {
      const response = await axios.post(
        "/api/user/wishlist",
        { product },
        { headers: { authorization: token } }
      );
      setWishlist(response.data.wishlist);

      toast.success("Added to Wishlist");
    } catch (err) {
      console.error("Error in Wishlist", err);
    } finally {
      setDisableAddRemoveWishlistBtn(false);
    }
  };

  const removeFromWishlistHandler = async (productId) => {
    setDisableAddRemoveWishlistBtn(true);
    try {
      const response = await axios.delete("/api/user/wishlist/" + productId, {
        headers: { authorization: token },
      });
      setWishlist(response.data.wishlist);
    } catch (err) {
      console.error("Error in Wishlist", err);
    } finally {
      setDisableAddRemoveWishlistBtn(false);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <>
      <WishlistContext.Provider
        value={{
          wishlist,
          // setWishlist,
          addToWishlistHandler,
          removeFromWishlistHandler,
          clearWishlist,
          disableAddRemoveWishlistBtn,
        }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
}
