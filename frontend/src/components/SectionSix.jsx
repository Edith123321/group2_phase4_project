import React, { useState, useEffect } from 'react';
import './SectionSix.css';

const SectionSix = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Otile',
      profession: 'Fashion Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Kina',
      profession: 'Model',
      image: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Elsa',
      profession: 'Influencer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Lupita',
      profession: 'Actress',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Nyash',
      profession: 'TV Host',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Get current 3 cards to display
  const visibleTestimonials = testimonials.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <section className="section-six">
      <div className="section-six-container">
        <h2 className="section-six-heading">Look who's wearing Mintmade!</h2>
        
        <div className="section-six-carousel">
          {visibleTestimonials.map((person, index) => (
            <div key={index} className="section-six-card">
              <img src={person.image} alt={person.name} className="section-six-image" />
              <div className="section-six-content">
                <h3 className="section-six-name">{person.name}</h3>
                <p className="section-six-profession">{person.profession}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-six-indicators">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
            <button
              key={i}
              className={`section-six-indicator ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionSix;