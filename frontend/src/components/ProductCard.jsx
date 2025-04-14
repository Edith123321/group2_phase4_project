import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { deleteProduct , addToCart} = useProductContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${product.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;
  
    try {
      await deleteProduct(product.id);
      window.location.href = '/products'; // Force full page reload to /products
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };
  

  const handleAddToCart = () => {
    const selectedColor = product.colors?.[0] || null;
    const selectedSize = product.sizes?.[0] || null;
    
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1
    });
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.main_image} alt={product.title} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.title}</h3>
          <p className="product-price">Ksh {product.price.toLocaleString()}</p>
        </div>
      </Link>
      
      <div className="product-buttons">
        <button onClick={handleAddToCart} className="add-to-cart">
          Add to Cart
        </button>
        
        <div className="admin-buttons">
          <button onClick={handleEdit} className="edit-button" aria-label="Edit product">
            <FaEdit />
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-button" 
            aria-label="Delete product"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;