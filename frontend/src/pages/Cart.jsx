import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css';
import lock from '../assets/lock.png';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useProductContext();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 300; 
  const total = subtotal + shipping;

  const handleQuantityChange = (id, selectedColor, selectedSize, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, selectedColor, selectedSize, newQuantity);
    }
  };

  // Function to get color name from color code (if needed)
  const getColorName = (colorCode) => {
    // You might want to map color codes to names if your seed data uses codes
    return colorCode; // Return as-is if already using names
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <Link to="/products" className="back-button">
          <FaArrowLeft /> Continue Shopping
        </Link>
        <h1 className='shopping-bag'>Your Shopping Bag</h1>
        {cart.length > 0 && (
          <button onClick={clearCart} className="clear-cart">
            <FaTrash /> Clear Bag
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingBag size={48} />
          <h2>Your bag is empty</h2>
          <p>Looks like you haven't added anything to your bag yet</p>
          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={`${item.id}-${item.colors}-${item.size}`} className="cart-item">
                <img src={item.main_image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  {item.selectedColor && (
                    <p className="item-option">
                      Color: {getColorName(item.color)}
                      {item.colors && item.colors.includes(item.color) && (
                        <span 
                          className="color-circle" 
                          style={{ 
                            backgroundColor: item.selectedColor.toLowerCase(),
                            display: 'inline-block',
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            marginLeft: '8px',
                            border: '1px solid #ccc'
                          }} 
                        />
                      )}
                    </p>
                  )}
                  {item.selectedSize && (
                    <p className="item-option">Size: {item.selectedSize}</p>
                  )}
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleQuantityChange(
                        item.id, 
                        item.selectedColor, 
                        item.selectedSize, 
                        item.quantity - 1
                      )}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(
                      item.id, 
                      item.selectedColor, 
                      item.selectedSize, 
                      item.quantity + 1
                    )}>
                      +
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  <p>Ksh {(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                    className="remove-item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Ksh {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `Ksh ${shipping.toLocaleString()}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>Ksh {total.toLocaleString()}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
            <p className="secure-checkout">
              <img src={lock} alt="Secure" /> Secure checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;