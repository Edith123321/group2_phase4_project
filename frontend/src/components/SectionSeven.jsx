import React from 'react';
import './SectionSeven.css';
import whyus from '../assets/whyus.png'

const SectionSeven = () => {
  return (
    <section className="section-seven">
      <div className="section-seven-container">
        <div className="section-seven-image">
          <img 
            src= {whyus}
            alt="Happy customer shopping at Mintmade Fashion" 
          />
        </div>
        
        <div className="section-seven-content">
          <h2 className="section-seven-title">Why people love to shop at Mintmade Fashion</h2>
          
          <ul className="section-seven-benefits">
            <li className="benefit-item">
              <span className="benefit-icon"></span>
              <span>Order before 2 pm and get your purchase within the day.</span>
            </li>
            
            <li className="benefit-item">
              <span className="benefit-icon"></span>
              <span>Not your size? Avail of our hassle-free return policy.</span>
            </li>
            
            <li className="benefit-item">
              <span className="benefit-icon"></span>
              <span>Get 24/7 customer support.</span>
            </li>
            
            <li className="benefit-item">
              <span className="benefit-icon"></span>
              <span>We support contactless payment and cash on delivery.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SectionSeven;