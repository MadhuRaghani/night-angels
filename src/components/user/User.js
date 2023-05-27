import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function User() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default User;
