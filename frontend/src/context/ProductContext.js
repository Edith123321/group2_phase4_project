import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // If exists, increase quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // If new, add with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

 // In your ProductContext.js
const deleteProduct = (id) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== id);
      console.log('Products after deletion:', updatedProducts); // Debug log
      return updatedProducts;
    });
    
    // Also remove from cart if present
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      console.log('Cart after deletion:', updatedCart); // Debug log
      return updatedCart;
    });
  };

  const editProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { ...product, id: Date.now() }]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addToCart,
        deleteProduct,
        editProduct,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};