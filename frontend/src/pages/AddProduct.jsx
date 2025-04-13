import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { FiUpload, FiPlus, FiX } from 'react-icons/fi';
import './AddProduct.css';

const AddProduct = () => {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    colors: [],
    sizes: []
  });
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, newColor] }));
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, newSize] }));
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...formData,
      price: parseFloat(formData.price),
      additionalImages,
      rating: { rate: 0, count: 0 } // Initialize with no ratings
    };
    addProduct(productToAdd);
    navigate('/products');
  };

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
    "accessories"
  ];

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h1>Add New Product</h1>
        <p>Fill in the details below to add a new product to your store</p>
      </div>

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Product Name*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Premium Cotton T-Shirt"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (Ksh)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="e.g. 2499.99"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe the product features, materials, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Product Images</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Main Image*</label>
              <label htmlFor="main-image" className="image-upload-label">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <FiUpload size={24} />
                    <span>Upload Main Image</span>
                  </div>
                )}
                <input
                  id="main-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="hidden-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>Additional Images</label>
              <label htmlFor="additional-images" className="image-upload-label">
                <div className="upload-placeholder">
                  <FiPlus size={24} />
                  <span>Add More Images ({additionalImages.length})</span>
                </div>
                <input
                  id="additional-images"
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImages}
                  multiple
                  className="hidden-input"
                />
              </label>
              {additionalImages.length > 0 && (
                <div className="additional-images-preview">
                  {additionalImages.map((img, index) => (
                    <div key={index} className="additional-image">
                      <img src={img} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => setAdditionalImages(prev => prev.filter((_, i) => i !== index))}
                        className="remove-image-btn"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Variants</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Colors</label>
              <div className="variant-input-group">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="e.g. #ff0000 or 'Red'"
                />
                <button type="button" onClick={addColor} className="add-variant-btn">
                  <FiPlus /> Add
                </button>
              </div>
              {formData.colors.length > 0 && (
                <div className="variant-tags">
                  {formData.colors.map(color => (
                    <span key={color} className="variant-tag">
                      {color.startsWith('#') ? (
                        <>
                          <span className="color-circle" style={{ backgroundColor: color }} />
                          {color}
                        </>
                      ) : (
                        color
                      )}
                      <button type="button" onClick={() => removeColor(color)}>
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Sizes</label>
              <div className="variant-input-group">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="e.g. S, M, L, XL"
                />
                <button type="button" onClick={addSize} className="add-variant-btn">
                  <FiPlus /> Add
                </button>
              </div>
              {formData.sizes.length > 0 && (
                <div className="variant-tags">
                  {formData.sizes.map(size => (
                    <span key={size} className="variant-tag">
                      {size}
                      <button type="button" onClick={() => removeSize(size)}>
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/products')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;