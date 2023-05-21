import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({ hasError: false, errorMessage: "" });
  const navigate = useNavigate();

  const regexPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,14}$/;
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  const validateRegex = (value, regex) => regex.test(value);

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      if (!validateRegex(signUpData.password, regexPassword)) {
        setError({
          hasError: true,
          errorMessage:
            "Password should be 8 to 14 characters long and should have a digit, a special character, one uppercase and one lowercase letter",
        });
      } else if (!validateRegex(signUpData.email, regexEmail)) {
        setError({
          hasError: true,
          errorMessage: "Please enter a valid email",
        });
      } else if (signUpData.password !== signUpData.confirmPassword) {
        setError({
          hasError: true,
          errorMessage: "Password and Confirm Password Should Match",
        });
        setSignUpData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      } else {
        const response = await axios.post("/api/auth/signup", {
          ...signUpData,
        });
        console.log(response);
        if (response.status === 201) {
          toast.success("SignUp Successful");
          navigate("/login");
        }
      }
    } catch (e) {
      const err = e.response.data.errors[0];
      err.includes("Email Already Exists")
        ? setError("Account Already exists.")
        : setError(err);
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
        <div>
          <label>
            Password:{" "}
            <input
              required
              type={showPassword ? "text" : "password"}
              value={signUpData.password}
              onChange={(event) =>
                setSignUpData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
            <label
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </label>
          </label>
        </div>
        <div>
          <label>
            Confirm Password:{" "}
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              value={signUpData.confirmPassword}
              onChange={(event) =>
                setSignUpData((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
            />
            <label
              onClick={() => {
                setShowConfirmPassword((prev) => !prev);
              }}
            >
              {showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </label>
          </label>
        </div>
        {error.hasError && <span>{error.errorMessage}</span>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
