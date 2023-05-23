export function filtersReducerFunction(filters, action) {
  switch (action.type) {
    case "SEARCH": {
      return { ...filters, search: action.payload };
    }
    case "SORT": {
      return { ...filters, sort: action.payload };
    }
    case "CATEGORIES": {
      const modifiedCategories = filters.categories.includes(action.payload)
        ? [...filters.categories].filter(
            (category) => category !== action.payload
          )
        : [...filters.categories, action.payload];
      return { ...filters, categories: modifiedCategories };
    }
    case "SIZES": {
      const modifiedSizes = filters.sizes.includes(action.payload)
        ? [...filters.sizes].filter((size) => size !== action.payload)
        : [...filters.sizes, action.payload];
      return { ...filters, sizes: modifiedSizes };
    }
    case "STARS": {
      return { ...filters, stars: action.payload };
    }
    case "PRICE": {
      return { ...filters, price: action.payload };
    }
    case "CLEAR_FILTERS": {
      return {
        search: "",
        sort: "",
        categories: [],
        sizes: [],
        stars: "",
        price: "",
      };
    }
    default: {
      return filters;
    }
  }
}
