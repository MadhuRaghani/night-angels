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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productlists" element={<ProductListing />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
