import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { getProductHandler } from "../../services/ProductServices";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  addToWishlistHandler,
  removeFromWishlistHandler,
} from "../../services/WishlistServices";
import { addToCartHanler } from "../../services/CartServices";
import { CartContext } from "../../contexts/CartContext";

function SingleProductCard() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const { isLoggedIn, token } = useContext(AuthContext);
  const {
    wishlist,
    disableAddRemoveWishlistBtn,
    setWishlist,
    setDisableAddRemoveWishlistBtn,
  } = useContext(WishlistContext);
  const { cart, disableAddToCartBtn, setCart, setDisableAddToCartBtn } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProductHandler(productId, setProduct);
  }, [productId]);

  const {
    _id,
    title,
    description,
    original_price,
    price,
    rating,
    size,
    in_stock,
    image,
    category,
    brand,
    fabric,
    color,
    new_arrivals,
    reviews,
    delivery_time,
  } = product;

  const getDeliveryDate = (delivery_time) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var ts = 86400000 * delivery_time + +new Date();
    const delivery_date = new Date(ts);
    return (
      "Get it By " +
      days[delivery_date.getDay()] +
      ", " +
      delivery_date.getDate() +
      " " +
      months[delivery_date.getMonth()]
    );
  };

  const discount = Math.floor(
    ((original_price - price) / original_price) * 100
  );

  return (
    <div className="single-product-page-main-div">
      <div className="single-product-page">
        <div className="image-card-div-product">
          {new_arrivals && (
            <div className="new-arrivals-div">
              <span>New Arrivals</span>
            </div>
          )}
          <div className="size-div">{size}</div>
          <div className="ratings-reviews-div ratings-review-product">
            <span className="ratings-reviews-span">
              <AiOutlineStar size={14} />
              {rating} | {reviews}
            </span>
          </div>
          <div className="image-div">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="product-details-div">
          <div>
            <h2>{brand}</h2>
            <p>{title}</p>
          </div>
          <div className="price-and-discount-div-product">
            <div className="price-div">
              <span className="product-price">₹{price}</span>
              <span className="product-original-price">₹{original_price}</span>
            </div>
            <span className="product-discount">({discount}% OFF)</span>
          </div>
          <div className="inclusive-taxes-div">
            <p>inclusive of all taxes</p>
          </div>
          <div className="cart-wishlist-div">
            {in_stock ? (
              <button
                className="product-cart-btn cursor-pointer"
                disabled={disableAddToCartBtn}
                onClick={() => {
                  if (isLoggedIn) {
                    cart?.find(({ _id: toFindId }) => _id === toFindId)
                      ? navigate("/cart")
                      : addToCartHanler(
                          product,
                          token,
                          setCart,
                          setDisableAddToCartBtn
                        );
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {cart?.find(({ _id: toFindId }) => _id === toFindId) ? (
                  <>
                    Go To Cart{" "}
                    <AiOutlineArrowRight size={14} className="icon" />
                  </>
                ) : (
                  <>
                    <AiOutlineShoppingCart size={14} className="icon" /> Add To
                    Cart
                  </>
                )}
              </button>
            ) : (
              <label className="out-of-stock-label-product">Out Of Stock</label>
            )}
            <button
              className="product-cart-btn cursor-pointer"
              disabled={disableAddRemoveWishlistBtn}
              onClick={() => {
                if (isLoggedIn) {
                  wishlist?.find(({ _id: toFindId }) => toFindId === _id)
                    ? removeFromWishlistHandler(
                        _id,
                        token,
                        setWishlist,
                        setDisableAddRemoveWishlistBtn
                      )
                    : addToWishlistHandler(
                        product,
                        token,
                        setWishlist,
                        setDisableAddRemoveWishlistBtn
                      );
                } else {
                  navigate("/login");
                }
              }}
            >
              {wishlist?.find(({ _id: toFindId }) => toFindId === _id) ? (
                <>
                  <AiFillHeart size={14} color="#fff" /> Wishlisted
                </>
              ) : (
                <label>
                  <AiOutlineHeart size={14} color="#fff" /> Add To Wishlist
                </label>
              )}
            </button>
          </div>
          <div className="product-description-div">
            <h4>Product Details</h4>
            <p>{description}</p>
          </div>
          <div className="specifications-details-div">
            <h4>Specifications</h4>
            <div className="specifications-div">
              <p>Fabric:</p>
              <p>{fabric}</p>
            </div>
            <div className="specifications-div">
              <p>Category:</p>
              <p>{category}</p>
            </div>
            <div className="specifications-div">
              <p>Color:</p>
              <p>{color}</p>
            </div>
          </div>
          <div className="delivery-div">
            <TbTruckDelivery className="icon" size={28} />
            <p>{getDeliveryDate(delivery_time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
