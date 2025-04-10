import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './ProductList.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setFilterCategory(urlCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
        setDisplayedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
    // Update URL when category changes
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
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
            <option value="men's clothing">For Him</option>
            <option value="women's clothing">For Her</option>
            <option value="jewelery">Accessories</option>
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