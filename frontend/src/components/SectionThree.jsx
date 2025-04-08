import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionThree.css';
import her from '../assets/her.png';

const SectionThree = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products?category=women%27s%20clothing'); // URL encoded "women's clothing"
  };

  return (
    <section className="section-three-container">
      <div className="section-three-content">
        <div className="section-three-image">
          <img 
            src={her}
            alt="Women's fashion collection"
          />
        </div>
        <div className="section-three-text">
          <h2 className="section-three-heading">Clothes <br /> for Her</h2>
          <p className="section-three-description">
            Shop for classic or trendy pieces you can wear every day. 
            Our women's collection features timeless staples and the latest styles, 
            curated to help you express your individuality with confidence. Whether you're 
            dressing up for a special occasion or embracing cozy casual, we've got options 
            that blend comfort and elegance seamlessly.
          </p>
          <button onClick={handleShopNow} className="section-three-button">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;