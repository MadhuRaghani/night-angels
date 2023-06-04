import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  // AiOutlineSearch,
} from "react-icons/ai";
import "../navbar/Navbar.css";
import { ProductsContext } from "../../contexts/ProductsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";

function Navbar() {
  const { filtersDispatch } = useContext(ProductsContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="nav-bar">
      <nav className="nav-full">
        <div className="nav-left">
          <Link className="link app-name" to="/">
            NightAngels
          </Link>
        </div>
        <div className="nav-center">
          <label>
            <input
              type="text"
              placeholder="Search"
              className="nav-search-input"
              onChange={(event) => {
                filtersDispatch({
                  type: "SEARCH",
                  payload: event.target.value,
                });
              }}
            />
          </label>
        </div>
        <div className="nav-right">
          <Link
            className="link"
            to="/productlists"
            onClick={() => {
              filtersDispatch({ type: "CLEAR_FILTERS" });
            }}
          >
            Explore
          </Link>
          <Link className="link" to={isLoggedIn ? "/user" : "/login"}>
            <AiOutlineUser size={28} />
          </Link>
          <Link className="link wishlist-link" to="/wishlist">
            <AiOutlineHeart size={28} />
            {wishlist.length > 0 && (
              <p className="wishlist-number">{wishlist.length}</p>
            )}
          </Link>
          <Link className="link  wishlist-link" to="/cart">
            <AiOutlineShoppingCart size={28} />
            {cart.length > 0 && (
              <p className="wishlist-number">{cart.length}</p>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
