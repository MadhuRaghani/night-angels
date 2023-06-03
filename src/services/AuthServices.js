import axios from "axios";
import { toast } from "react-toastify";
const regexPassword =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,14}$/;
const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validateRegex = (value, regex) => regex.test(value);

export const signUpHandler = async (
  e,
  signUpData,
  setSignUpData,
  setErrorSignup,
  navigate,
  setIsLoggedIn,
  setUser,
  setToken,
  location
) => {
  e.preventDefault();
  try {
    if (!validateRegex(signUpData.password, regexPassword)) {
      setErrorSignup({
        hasError: true,
        errorMessage:
          "Password should be 8 to 14 characters long and should have a digit, a special character, one uppercase and one lowercase letter",
      });
      toast.error("Password Not Strong Enough!");
    } else if (!validateRegex(signUpData.email, regexEmail)) {
      setErrorSignup({
        hasError: true,
        errorMessage: "Please enter a valid email",
      });
      toast.error("Please enter a valid email");
    } else if (signUpData.password !== signUpData.confirmPassword) {
      setErrorSignup({
        hasError: true,
        errorMessage: "Password and Confirm Password Should Match",
      });
      setSignUpData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      toast.error("Password and Confirm Password Should Match");
    } else {
      const response = await axios.post("/api/auth/signup", {
        ...signUpData,
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("SignUp Successful");
        // setErrorSignup({ hasError: false, errorMessage: "" });

        // setting userDetails to local storage
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.createdUser)
        );
        localStorage.setItem("authenticationToken", response.data.encodedToken);

        // setting userDetails to Auth Context
        setIsLoggedIn(true);
        setUser(response.data.createdUser);
        setToken(response.data.encodedToken);
        toast.success("Login Successful");

        // navigate to page you came from
        if (location?.state?.from) {
          navigate(location?.state?.from);
        } else {
          navigate("/");
        }
      }
    }
  } catch (e) {
    const err = e.response.data.errors[0];
    err.includes("Email Already Exists")
      ? setErrorSignup("Account Already exists.")
      : setErrorSignup(err);
  }
};

export const loginHandler = async (
  e,
  email,
  password,
  setIsLoggedIn,
  setEmail,
  setPassword,
  setErrorLogin,
  setUser,
  setToken,
  navigate,
  location
) => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/auth/login", { email, password });

    if (response.status === 200) {
      toast.success("Login Successful");

      // setting userDetails to local storage
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.foundUser)
      );
      localStorage.setItem("authenticationToken", response.data.encodedToken);

      // setting userDetails to Auth Context
      setIsLoggedIn(true);
      setUser(response.data.foundUser);
      setToken(response.data.encodedToken);

      // setErrorLogin({ hasError: false, errorMessage: "" });
      setEmail("");
      setPassword("");
      console.log(response);

      // navigate to page you came from
      if (location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
    }
  } catch (e) {
    console.error(e);
    const err = e.response.data.errors[0];
    setErrorLogin({
      hasError: true,
      errorMessage: err.includes("The email you entered is not Registered")
        ? "Email Not Registered"
        : err,
    });
  }
};

export const logoutHandler = (setUser, setToken, clearWishlist) => {
  localStorage.removeItem("authenticationToken");
  localStorage.removeItem("userDetails");
  setToken(null);
  setUser(null);
  clearWishlist();
  // delete cart and wishlist from context
};
