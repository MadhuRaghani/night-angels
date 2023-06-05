import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import ProductListing from "./components/products/ProductListing";
import Footer from "./components/footer/Footer.js";
import Wishlist from "./components/wishlist/Wishlist.js";
import Cart from "./components/cart/Cart.js";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import User from "./components/user/User";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import SingleProductCard from "./components/products/SingleProductCard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productlists" element={<ProductListing />} />
        <Route path="/products/:productId" element={<SingleProductCard />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/mockman"
          element={
            <PrivateRoute>
              <Mockman />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
