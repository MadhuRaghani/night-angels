import { createContext, useState, useEffect, useReducer } from "react";
import { filtersReducerFunction } from "../reducers/FiltersReducer";
import axios from "axios";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, filtersDispatch] = useReducer(filtersReducerFunction, {
    search: "",
    sort: "",
    categories: [],
    sizes: [],
    stars: "",
    price: "",
  });

  const filteredProducts =
    filters.search.length > 0
      ? products.filter(({ title }) =>
          title.toLowerCase().includes(filters.search.toLowerCase())
        )
      : products;

  const categoriesedProducts =
    filters.categories.length > 0
      ? filteredProducts.filter(({ category }) =>
          filters.categories.includes(category)
        )
      : filteredProducts;

  const availableSizesProducts =
    filters.sizes.length > 0
      ? categoriesedProducts.filter(({ sizesAvailable }) =>
          filters.sizes.some((eachSize) => sizesAvailable.includes(eachSize))
        )
      : categoriesedProducts;

  const ratingStarsProducts =
    filters.stars.length > 0
      ? availableSizesProducts.filter(({ rating }) => filters.stars < rating)
      : availableSizesProducts;

  const selectedPriceProducts =
    filters.price.length > 0
      ? ratingStarsProducts.filter(
          ({ price }) => parseInt(price) <= parseInt(filters.price)
        )
      : ratingStarsProducts;

  const sortedProducts =
    filters.sort.length > 0
      ? filters.sort === "LOW_TO_HIGH"
        ? [...selectedPriceProducts].sort(
            ({ price: price1 }, { price: price2 }) => price1 - price2
          )
        : [...selectedPriceProducts].sort(
            ({ price: price1 }, { price: price2 }) => price2 - price1
          )
      : selectedPriceProducts;

  // console.log(filters);

  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await axios.get("/api/categories", {});
        if (categoriesResponse.status === 200) {
          setCategories(categoriesResponse.data.categories);
        }
        const productsResponse = await axios.get("/api/products", {});
        if (productsResponse.status === 200) {
          setProducts(productsResponse.data.products);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        sortedProducts,
        filtersDispatch,
        searchFilters: filters.search,
        sortFilters: filters.sort,
        categoriesFilters: filters.categories,
        sizesFilters: filters.sizes,
        starsFilters: filters.stars,
        priceFilters: filters.price,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
