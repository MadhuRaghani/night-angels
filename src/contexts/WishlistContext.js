import { createContext, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [disableAddRemoveWishlistBtn, setDisableAddRemoveWishlistBtn] =
    useState(false);

  return (
    <>
      <WishlistContext.Provider
        value={{
          wishlist,
          setWishlist,
          disableAddRemoveWishlistBtn,
          setDisableAddRemoveWishlistBtn,
        }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
}
