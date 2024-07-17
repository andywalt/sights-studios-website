import React, { useEffect, useState } from 'react';
import Card from '../Card/card';
import gsap from 'gsap';
import './CardCarousel.css';
import { cardData } from './cardData';

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active card index
  const [cardsOrder, setCardsOrder] = useState(cardData); // Order of cards
  const [autoPlay, setAutoPlay] = useState(true); // Control autoplay
  // Handle autoplay logic
  useEffect(() => {
    let interval;

    if (autoPlay) {
      console.log('Autoplay started');
      interval = setInterval(() => {
        setCardsOrder((prevOrder) => {
          const newOrder = [...prevOrder];
          const [activeCard] = newOrder.splice(0, 1);
          newOrder.push(activeCard);
          setActiveIndex(0); // Reset active index
          return newOrder;
        });
      }, 5000); // Change card every 4 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Autoplay stopped');
      }
    };
  }, [autoPlay]);

  // Handle card click event
  const handleCardClick = (index) => {
    console.log('Card clicked:', index);
    setAutoPlay(false); // Stop autoplay
    console.log('Autoplay stopped by click');
    const newOrder = [...cardsOrder];
    const [selectedCard] = newOrder.splice(index, 1); // Move clicked card to the front
    newOrder.unshift(selectedCard);
    setCardsOrder(newOrder);
    setActiveIndex(0); // Set clicked card as active
  };

  // Handle arrow click event
  const handleArrowClick = (direction) => {
    setAutoPlay(false); // Stop autoplay
    console.log(`Arrow clicked: ${direction}`);
    setCardsOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      if (direction === 'left') {
        const lastCard = newOrder.pop();
        newOrder.unshift(lastCard);
      } else {
        const [firstCard] = newOrder.splice(0, 1);
        newOrder.push(firstCard);
      }
      return newOrder;
    });
  };

  // Handle card animation for autoplay
  useEffect(() => {
    const cards = gsap.utils.toArray('.small-card');
    const tl = gsap.timeline({
      repeat: -1,
      paused: !autoPlay,
    });

    tl.set(cards, {
      x: (i) => i,
    });

    tl.to(cards, {
      x: `-=${cards.length * 200}`,
      ease: 'none',
      duration: cards.length * 4,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (cards.length * 200)),
      },
    });

    return () => tl.kill();
  }, [cardsOrder, autoPlay]);

  // Reset state of the small cards
  useEffect(() => {
    const resetCardState = () => {
      const cards = document.querySelectorAll('.small-card');
      cards.forEach((card) => {
        gsap.set(card, { clearProps: 'all' });
      });
    };

    resetCardState();
  }, [activeIndex, cardsOrder]); // Ensure dependencies are accurate

  return (
    <div className="carousel-section">
      {/* Active card as background */}
      <div className="background-image" style={{ backgroundImage: `url(${cardsOrder[0].image})` }}>
        {/* Smaller cards container */}
        <div className="small-cards-container">
          {cardsOrder.map((card, index) => (
            index !== activeIndex && ( // Only render non-active cards in the small container
              <div
                key={index}
                className={`small-card ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(index)} // Make the card clickable
              >
                <Card
                  image={card.image}
                  client={card.client}
                  title={card.title}
                  title2={card.title2}
                />
              </div>
            )
          ))}
        </div>
        {/* Active card information */}
        <div className="active-card-info">
          <h2>{cardsOrder[0].title} {cardsOrder[0].title2}</h2>
          <h1>{cardsOrder[0].client}</h1>
          <p>{cardsOrder[0].description}</p>
        </div>
        {/* Arrows for navigation */}
        <div className="arrows">
          <div className="arrow" onClick={() => handleArrowClick('left')}>
            <svg viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="arrow" onClick={() => handleArrowClick('right')}>
            <svg viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
