import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionFive.css';
import accessory from '../assets/accessory.png';

const SectionFive = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products?category=jewelery'); // Using the exact category from the API
  };

  return (
    <section className="section-five-container">
      <div className="section-five-content">
        <div className="section-five-image">
          <img 
            src={accessory}
            alt="Accessories collection"
          />
        </div>
        <div className="section-five-text">
          <h2 className="section-five-heading">Accessories</h2>
          <p className="section-five-description">
            Find statement pieces or everyday essentials to complete your outfit. From bags to jewelry, elevate your style with a variety of handpicked accessories perfect for any occasion.
          </p>
          <button onClick={handleShopNow} className="section-five-button">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionFive;