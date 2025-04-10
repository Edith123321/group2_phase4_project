import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
 
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

 // In your ProductContext.js
const deleteProduct = (id) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(product => product.id !== id);
      console.log('Products after deletion:', updatedProducts); 
    });
    
    
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
  const updateProduct = async (id, updatedProduct) => {
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      const data = await response.json();
      setProducts(prev => prev.map(p => p.id === id ? data : p));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
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
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};