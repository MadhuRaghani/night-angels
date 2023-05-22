import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ hasError: false, errorMessage: "" });
  const { setIsLoggedIn } = useContext(AuthContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("authenticationToken", response.data.encodedToken);
      setIsLoggedIn(true);
      setError({ hasError: false, errorMessage: "" });
      setEmail("");
      setPassword("");
      console.log(response);
      toast.success("SignUp Successful");
      // localStorage.getItem("authenticationToken");
      // navigate to page you came from
    } catch (e) {
      console.error(e);
      const err = e.response.data.errors[0];
      setError({
        hasError: true,
        errorMessage: err.includes("The email you entered is not Registered")
          ? "Email Not Registered"
          : err,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-main">
          <form onSubmit={onsubmitHandler} className="login-form">
            <div className="login-card">
              <label className="details-label" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="login-card">
              <label className="details-label">Password: </label>
              <div className="login-password-card">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </label>
              </div>
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="signup-login-div">
          <p>
            Don't Have an Account? <Link to="/signup">Sign Up?</Link>
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

export default Login;
