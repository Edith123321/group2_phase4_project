import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './ProductList.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProductContext } from '../context/ProductContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterCategory, setFilterCategory] = useState('all');
  const { addToCart} = useProductContext()

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setFilterCategory(urlCategory);
    }
  }, [searchParams]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        setDisplayedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when search or category changes
  useEffect(() => {
    let filtered = [...products];

    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, filterCategory, products]);

  // Update searchParams and state for category change
  useEffect(() => {
    if (filterCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', filterCategory);
    }
    setSearchParams(searchParams);
  }, [filterCategory, searchParams]);

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <>
      <Navbar />
      <section className="product-list-container">
        <h2 className="product-list-heading">Explore Products</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select 
            onChange={(e) => handleCategoryChange(e.target.value)} 
            value={filterCategory}
          >
            <option value="all">All</option>
            <option value="men's wear">For Him</option>
            <option value="women's wear">For Her</option>
            <option value="jewelry">Accessories</option>
          </select>
        </div>

        <div className="product-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
