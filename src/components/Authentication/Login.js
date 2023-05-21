import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={onsubmitHandler}>
        <label>
          Email:{" "}
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:{" "}
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
        </label>
        {error.hasError && <span>{error.errorMessage}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
