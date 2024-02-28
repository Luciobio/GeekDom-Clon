import { createContext, useState } from "react";

const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
const ProductsProvider = ({ children }) => {
  const [allProducts, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleInitializeProducts = (newProducts) => {
    const newProductsCopy = [].concat(newProducts)
    setProducts(newProductsCopy)
    setFilteredProducts(newProductsCopy)
  }

  const handleFilterByCategory = (category) => {
    let newFilteredProducts = [].concat(allProducts)
    if (category && category !== "Todas") {
      newFilteredProducts = newFilteredProducts.filter(
        (p) => p.categoria === category
      )
    }
    setFilteredProducts(newFilteredProducts)
  };

  const handleFilterBySearch = (category,searchText) => {
    let newFilteredProducts
    newFilteredProducts = [...allProducts]
    if(category && category !== 'Todas'){
      newFilteredProducts = newFilteredProducts.filter((p) => p.categoria === category);
    }
    if (searchText && searchText.trim() !== '') {
      newFilteredProducts = newFilteredProducts.filter((p) => {
        return (p.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchText.toLowerCase()))
      })
    }
    setFilteredProducts(newFilteredProducts)
  };

  return (
    <ProductsContext.Provider
      value={{ allProducts, filteredProducts, initializeProducts: handleInitializeProducts, filterBySearch: handleFilterBySearch, filterByCategory: handleFilterByCategory }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };