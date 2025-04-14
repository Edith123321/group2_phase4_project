import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    main_image: '',
    category: '',
    additional_images: [],
    colors: [],
    sizes: [],
    stock: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct({
          ...data,
          price: data.price.toString()
        });
      } catch (err) {
        setError(`Failed to load product: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) : value
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setProduct(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Only if you're using cookies/sessions
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update product. Status: ${response.status}`);
      }
  
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/products'), 1000); // Navigate after a brief delay
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    }
  };
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={product.title} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input name="price" value={product.price} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} />
        </label>
        <label>
          Main Image URL:
          <input name="main_image" value={product.main_image} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input name="category" value={product.category} onChange={handleChange} />
        </label>
        <label>
          Additional Images (comma-separated):
          <input value={product.additional_images.join(', ')} onChange={(e) => handleArrayChange(e, 'additional_images')} />
        </label>
        <label>
          Colors (comma-separated):
          <input value={product.colors.join(', ')} onChange={(e) => handleArrayChange(e, 'colors')} />
        </label>
        <label>
          Sizes (comma-separated):
          <input value={product.sizes.join(', ')} onChange={(e) => handleArrayChange(e, 'sizes')} />
        </label>
        <label>
          Stock:
          <input name="stock" type="number" value={product.stock} onChange={handleChange} />
        </label>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
