// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-column">
          <h3 className="footer-logo">MINTMADE</h3>
          <p className="footer-description">
            Curated fashion for the modern individual. Quality pieces for everyday wear.
          </p>
          <div className="social-icons">
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="icon" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="icon" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF className="icon" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact">
            <li>edithgithinji2020@gmail.com</li>
            <li>+254 711 769 886</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MINTMADE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;