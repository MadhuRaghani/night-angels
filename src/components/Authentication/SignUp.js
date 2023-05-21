import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ hasError: false, errorMessage: "" });
  const navigate = useNavigate();

  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,14}$/;

  const validatePassword = (password) => regularExpression.test(password);

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      if (validatePassword(signUpData.password)) {
        const response = await axios.post("/api/auth/signup", {
          ...signUpData,
        });
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
        }
      } else {
        setError({
          hasError: true,
          errorMessage:
            "Password should be 8 to 14 characters long and should have a digit, a special character, one uppercase and one lowercase letter",
        });
      }
    } catch (e) {
      const err = e.response.data.errors[0];
      err.includes("Email Already Exists")
        ? setError("Account Already exists.")
        : setError(err);
      // console.error(e);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={signUpHandler}>
        <label>
          First Name:{" "}
          <input
            required
            type="text"
            value={signUpData.firstName}
            onChange={(event) =>
              setSignUpData((prev) => ({
                ...prev,
                firstName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            required
            type="text"
            value={signUpData.lastName}
            onChange={(event) =>
              setSignUpData((prev) => ({
                ...prev,
                lastName: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Email:{" "}
          <input
            required
            type="email"
            value={signUpData.email}
            onChange={(event) =>
              setSignUpData((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </label>
        <label>
          Password:{" "}
          <input
            required
            type="password"
            value={signUpData.password}
            onChange={(event) =>
              setSignUpData((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
          />
        </label>
        {error.hasError && <span>{error.errorMessage}</span>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
