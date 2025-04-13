import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Product updated!');
        navigate('/products');
      } else {
        alert('Failed to update.');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={product.title} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Category:
          <input 
          name='category'
          type="text"
          value={product.category} 
          onChange = {handleChange}
          />
          
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className ="save-changes-form">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
