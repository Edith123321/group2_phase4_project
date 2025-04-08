import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, deleteProduct } = useProductContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Ksh {product.price}</p>
        <div className="product-buttons">
          <button onClick={() => addToCart(product)} className="add-to-cart">
            Add to Cart
          </button>
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