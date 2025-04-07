import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionFour.css';
import him from '../assets/him.png'; // Update with your actual image path

const SectionFour = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products/him');
  };

  return (
    <section className="section-four-container">
      <div className="section-four-content">
        <div className="section-four-text">
          <h2 className="section-four-heading">Clothes <br /> for Him</h2>
          <p className="section-four-description">
            Discover a range of styles designed to suit every modern man’s lifestyle.
            From sharp, tailored pieces for formal events to laid-back casual wear that 
            doesn’t compromise on style, our men's collection is crafted with detail, 
            quality, and versatility in mind. Elevate your wardrobe with essential 
            fits that work for any occasion, any day of the week.
          </p>
          <button onClick={handleShopNow} className="section-four-button">
            Shop Now
          </button>
        </div>
        <div className="section-four-image">
          <img 
            src={him}
            alt="Men's fashion collection"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionFour;
