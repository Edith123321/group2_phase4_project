import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToRecentlyViewed } = useProductContext();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = () => {
      setLoading(true);
      const foundProduct = products.find(p => p.id.toString() === id.toString());
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default selections
        if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
        if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
        
        // Find related products (same category, excluding current product)
        const related = products.filter(
          p => p.category === foundProduct.category && p.id !== foundProduct.id
        ).slice(0, 4);
        setRelatedProducts(related);
        
        // Add to recently viewed
        addToRecentlyViewed(foundProduct);
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [id, products, addToRecentlyViewed]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Validate selections if options exist
    if (product.colors?.length && !selectedColor) {
      alert('Please select a color');
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);
    alert('Added to cart!');
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <>
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail-grid">
        {/* Product Images */}
        <div className="product-images">
          <img src={product.main_image} alt={product.title} className="main-image" />
          
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">Ksh {product.price.toLocaleString()}</p>
          
          <div className="product-meta">
            <span className="rating">★★★★☆ ({product.rating?.count || 0} reviews)</span>
            <span className="availability">In Stock</span>
          </div>

          <p className="description">{product.description}</p>

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="option-selector">
              <h3>Color</h3>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="option-selector">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Product Details */}
          <div className="product-specs">
            <h3>Product Details</h3>
            <ul>
              {product.material && <li><strong>Material:</strong> {product.material}</li>}
              {product.dimensions && <li><strong>Dimensions:</strong> {product.dimensions}</li>}
              {product.careInstructions && <li><strong>Care:</strong> {product.careInstructions}</li>}
              <li><strong>SKU:</strong> {product.id}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="related-product-card"
              />
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default ProductDetail;