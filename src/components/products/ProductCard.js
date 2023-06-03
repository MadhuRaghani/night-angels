// import './ProductCard.css';
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
} from "react-icons/ai";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  // const navigate = useNavigate();
  // const [cartbuttonDisabled, setcartDisable] = useState(false);
  // const [wishButtonDisabled, setWishDisable] = useState(false);
  const {
    _id,
    title,
    // description,
    original_price,
    price,
    brand,
    rating,
    sizesAvailable,
    image,
    // category,
    // fabric,
    // color,
    new_arrivals,
    reviews,
  } = product;
  // const { token } = useAuth();
  // const location = useLocation();

  const discount = Math.floor(
    ((original_price - price) / original_price) * 100
  );

  const {
    wishlist,
    addToWishlistHandler,
    removeFromWishlistHandler,
    disableAddRemoveWishlistBtn,
  } = useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="image-card-div">
        {new_arrivals && (
          <div className="new-arrivals-div">
            <span>New Arrivals</span>
          </div>
        )}
        {/* <div className="wishlist-div">
          <AiOutlineHeart className="cursor-pointer" />
        </div> */}
        <div className="ratings-reviews-div">
          <span className="ratings-reviews-span">
            <AiOutlineStar size={14} />
            {rating} | {reviews}
          </span>
        </div>
        <div className="image-div">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="product-details-card-div">
        <div className="title-div">
          <p className="product-brand">{brand}</p>
          <p className="product-title">{title}</p>
        </div>
        <div className="price-and-discount-div">
          <div className="price-div">
            <span className="product-price">₹{price}</span>
            <span className="product-original-price">₹{original_price}</span>
          </div>
          <span className="product-discount">({discount}% OFF)</span>
        </div>
      </div>
      <div className="add-to-cart-btn-div">
        {sizesAvailable.length > 0 ? (
          <button
            className="add-to-cart-btn cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
              } else {
                navigate("/login");
              }
            }}
          >
            <AiOutlineShoppingCart size={14} />
            Add To Cart
          </button>
        ) : (
          <span className="out-of-stock-label">Out Of Stock</span>
        )}
        <button
          disabled={disableAddRemoveWishlistBtn}
          onClick={() => {
            if (isLoggedIn) {
              wishlist?.find(({ _id: toFindId }) => toFindId === _id)
                ? removeFromWishlistHandler(_id)
                : addToWishlistHandler(product);
            } else {
              navigate("/login");
            }
          }}
        >
          {wishlist?.find(({ _id: toFindId }) => toFindId === _id) ? (
            <AiFillHeart size={42} color="#813772" className="cursor-pointer" />
          ) : (
            <AiOutlineHeart size={42} className="cursor-pointer" />
          )}
        </button>
      </div>
      <div>
        {sizesAvailable.map((size) => (
          <span key={size}>{size}||</span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
