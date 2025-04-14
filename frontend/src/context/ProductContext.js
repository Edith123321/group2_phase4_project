import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState([])

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
    fetchProducts();
  }, []);

  // Persist data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cart functions
  const addToCart = (product, selectedColor = null, selectedSize = null, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { 
        ...product, 
        selectedColor, 
        selectedSize, 
        quantity 
      }];
    });
  };

  const removeFromCart = (id, color = null, size = null) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === id && 
          item.selectedColor === color && 
          item.selectedSize === size)
      )
    );
  };

  // In your CartContext.js
const updateQuantity = (id, selectedColor, selectedSize, newQuantity) => {
  setCart(prevCart => 
    prevCart.map(item => 
      item.id === id && 
      item.selectedColor === selectedColor && 
      item.selectedSize === selectedSize
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
};

  const clearCart = () => {
    setCart([]);
  };

  // Product CRUD operations
  const addProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });
  
      if (!response.ok) throw new Error('Failed to add product');
      
      const addedProduct = await response.json();
      setProducts(prev => [...prev, addedProduct]);
      return addedProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const editProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
      
      setDisplayedProducts(prevDisplayed => 
        prevDisplayed.filter(product => product.id !== productId)
        
      );

     
      return { success: true };
      
    } catch (error) {
      console.error('Delete product error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to delete product' 
      };
    }
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  // Recently viewed products
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  // Utility functions
  const cartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        addProduct,
        editProduct,
        deleteProduct,
        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};