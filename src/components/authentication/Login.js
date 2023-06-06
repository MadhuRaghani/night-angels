import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginHandler } from "../../services/AuthServices";
import { WishlistContext } from "../../contexts/WishlistContext";
import { CartContext } from "../../contexts/CartContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState({
    hasError: false,
    errorMessage: "",
  });
  const { setIsLoggedIn, setUser, setToken } = useContext(AuthContext);
  const { setWishlist } = useContext(WishlistContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-main">
          <form
            onSubmit={(e) => {
              loginHandler(
                e,
                email,
                password,
                setIsLoggedIn,
                setEmail,
                setPassword,
                setErrorLogin,
                setUser,
                setToken,
                setWishlist,
                setCart,
                navigate,
                location
              );
            }}
            className="login-form"
          >
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
            <div className="submit-btn-div">
              <button className="submit-btn" type="submit">
                Login
              </button>
              <button
                className="submit-btn"
                type="button"
                onClick={() => {
                  setEmail("madhu@gmail.com");
                  setPassword("Madhu123*");
                }}
              >
                Login As Guest
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
          {errorLogin.hasError && (
            <span className="error-message">{errorLogin.errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
