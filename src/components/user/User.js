import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutHandler } from "../../services/AuthServices";

function User() {
  const { user, setUser, setToken } = useContext(AuthContext);
  // const {}

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          logoutHandler(setUser, setToken);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default User;
