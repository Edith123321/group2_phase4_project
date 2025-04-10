import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionOne.css';
import video from '../assets/jewelry.mp4' 

const SectionOne = () => {
  const navigate = useNavigate();
  
  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="hero-section">
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content Overlay */}
      <div className="hero-content">
        <h1 className="hero-title">Quick and hassle-<br />free shopping</h1>
        <button 
          onClick={handleShopNow}
          className="shop-now-button"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default SectionOne;