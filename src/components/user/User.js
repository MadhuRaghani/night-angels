import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutHandler } from "../../services/AuthServices";
import { WishlistContext } from "../../contexts/WishlistContext";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../user/User.css";

function User() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const { setWishlist } = useContext(WishlistContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="user-profile-div">
      <h2>User Profile</h2>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          navigate("/manage-address");
        }}
      >
        Manage Address
      </button>
      <button
        onClick={() => {
          logoutHandler(setUser, setToken, setWishlist, setCart);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default User;
