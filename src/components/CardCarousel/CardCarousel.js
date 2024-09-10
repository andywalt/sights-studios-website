import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./CardCarousel.css";
import { cardData } from "./cardData";

const CardCarousel = () => {
  const smallCardElems = useRef([]); // Refs for the small cards
  const [state, setState] = useState({ current: 0, next: 1 });
  const [userDetected, setUserDetected] = useState(false);
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true); // Track autoplay state
  
  // Autoplay timer reference
  const autoplayTimer = useRef(null);

  // Handle card switching logic and update indexes
  const updateIndexes = (current, next) => {
    setState({
      current: next,
      next: next === cardData.length - 1 ? 0 : next + 1,
    });
  };

  // Move to the next card automatically
  const moveToNextCard = () => {
    updateIndexes(state.current, state.next);
  };

  // Autoplay logic that switches cards every 6 seconds
  useEffect(() => {
    if (isAutoplayRunning) {
      autoplayTimer.current = setTimeout(() => {
        moveToNextCard();
      }, 6000);
    }

    // Ensure proper cleanup of the timer when component unmounts
    return () => {
      if (autoplayTimer.current) {
        clearTimeout(autoplayTimer.current);
      }
    };
  }, [state, isAutoplayRunning]);

  // Handle small card clicks
  const handleSmallCardClick = (index) => {
    // Stop autoplay when user interacts
    setIsAutoplayRunning(false);
    setUserDetected(true);
    updateIndexes(state.current, index);
  };

  // Update background and animate card information on change
  useEffect(() => {
    // Update the background image
    gsap.to(".background-image", {
      backgroundImage: `url(${cardData[state.current].image})`,
      duration: 1,
      ease: "power3.inOut",
    });

  }, [state]);

  return (
    <div className="carousel-section">
      {/* Background Image */}
      <div className="background-image">
        
        {/* Active card information */}
        <div className="active-card-info">
          <h2>{cardData[state.current].title}</h2>
          <h1>
            <a href={cardData[state.current].url} target="_blank" rel="noopener noreferrer">
              {cardData[state.current].client}
            </a>
          </h1>
          <p>{cardData[state.current].description}</p>
        </div>

        {/* Small Cards Carousel */}
        <div className="small-cards-container">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => (smallCardElems.current[index] = el)}
              className={`small-card ${index === state.current ? "active" : ""}`}
              onClick={() => handleSmallCardClick(index)}
            >
              <img src={card.image} alt={card.title} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
