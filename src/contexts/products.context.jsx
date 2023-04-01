import { useState, createContext } from "react";
import SHOP_DATA from "../utils/shop-data.json";

const ProductContext = createContext({
  products: [],
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductsProvider };
