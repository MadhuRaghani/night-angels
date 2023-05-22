import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../authentication/Auth.css";
import { Link } from "react-router-dom";

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
    <div className="login-page">
      <div className="login-container">
        <h2>Sign Up</h2>
        <div className="login-main">
          <form
            onSubmit={signUpHandler}
            autoComplete="off"
            className="login-form"
          >
            <div className="login-card">
              <label className="details-label" htmlFor="firstName">
                First Name:
              </label>
              <input
                id="firstName"
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
            </div>
            <div className="login-card">
              <label className="details-label" htmlFor="lastName">
                Last Name:
              </label>
              <input
                id="lastName"
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
            </div>
            <div className="login-card">
              <label className="details-label" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                required
                type="email"
                value={signUpData.email}
                onChange={(event) =>
                  setSignUpData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="login-card">
              <label className="details-label" htmlFor="password">
                Password:
              </label>
              <div className="login-password-card">
                <input
                  id="password"
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
                  htmlFor="password"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </label>
              </div>
            </div>
            <div className="login-card">
              <label htmlFor="confirmPassword" className="details-label">
                Confirm Password:{" "}
              </label>
              <div className="login-password-card">
                <input
                  id="confirmPassword"
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
                  htmlFor="confirmPassword"
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
              </div>
            </div>
            <div>
              <button type="submit" className="submit-btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="signup-login-div">
          <p>
            Already Have an Account? <Link to="/login">Login?</Link>
          </p>
        </div>
        <div className="error-main">
          {error.hasError && (
            <span className="error-message">{error.errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
