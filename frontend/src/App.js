import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';

import Cart from './pages/Cart';
import AddProducts from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path="/products/accessories" element={<ProductList category="accessories" />} />
        <Route path="/edit/:id" element={<EditProduct/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
