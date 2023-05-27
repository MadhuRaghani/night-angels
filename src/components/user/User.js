import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function User() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isLoggedIn, user);

  if (isLoggedIn) {
    return (
      <div>
        <h2>User Profile</h2>
        <p>Name: {user.firstName + " " + user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  } else {
    navigate("/login");
    return;
  }
}

export default User;
