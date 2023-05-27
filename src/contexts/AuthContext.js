import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, user, setUser, token, setToken }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
