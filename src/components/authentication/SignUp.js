import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "../authentication/Auth.css";
import { signUpHandler } from "../../services/AuthServices";
import { AuthContext } from "../../contexts/AuthContext";

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
  const [errorSignUp, setErrorSignup] = useState({
    hasError: false,
    errorMessage: "",
  });
  const { setIsLoggedIn, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Sign Up</h2>
        <div className="login-main">
          <form
            onSubmit={(e) => {
              signUpHandler(
                e,
                signUpData,
                setSignUpData,
                setErrorSignup,
                navigate,
                setIsLoggedIn,
                setUser,
                setToken,
                location
              );
            }}
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
          {errorSignUp.hasError && (
            <span className="error-message">{errorSignUp.errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
