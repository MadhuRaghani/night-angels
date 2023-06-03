import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [disableAddToCartBtn, setDisableAddToCartBtn] = useState(false);

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          disableAddToCartBtn,
          setDisableAddToCartBtn,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
