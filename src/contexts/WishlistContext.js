import { createContext } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  return (
    <>
      <WishlistContext.Provider value={{}}>{children}</WishlistContext.Provider>
    </>
  );
}
