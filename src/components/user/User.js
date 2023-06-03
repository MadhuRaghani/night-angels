import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutHandler } from "../../services/AuthServices";
import { WishlistContext } from "../../contexts/WishlistContext";

function User() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const { clearWishlist } = useContext(WishlistContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          logoutHandler(setUser, setToken, clearWishlist);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default User;
