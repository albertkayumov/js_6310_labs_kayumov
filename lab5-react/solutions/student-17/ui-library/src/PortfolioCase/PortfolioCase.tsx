import React, { useState } from 'react';
import Card from '../Card/Card';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import './PortfolioCase.css';

export interface PortfolioCaseProps {
  title: string;
  description: string;
  characteristics: string[];
  images: string[];
  onViewDetails: () => void;
  onOrder: () => void;
}

const PortfolioCase: React.FC<PortfolioCaseProps> = ({
  title,
  description,
  characteristics,
  images,
  onViewDetails,
  onOrder,
}) => {
  const [showFullView, setShowFullView] = useState(false);

  const handleCardClick = () => {
    setShowFullView(true);
  };

  const handleCloseFullView = () => {
    setShowFullView(false);
  };

  return (
    <>
      <Card className="portfolio-case" onClick={handleCardClick}>
        <div className="portfolio-case__image-container">
          <img 
            src={images[0]} 
            alt={title} 
            className="portfolio-case__image"
          />
        </div>
        
        <div className="portfolio-case__content">
          <h3 className="portfolio-case__title">{title}</h3>
          <p className="portfolio-case__description">{description}</p>
          
          <div className="portfolio-case__characteristics">
            <h4>Ключевые характеристики:</h4>
            <ul>
              {characteristics.map((char, index) => (
                <li key={index}>{char}</li>
              ))}
            </ul>
          </div>
          
          <div className="portfolio-case__actions">
            <button 
              className="portfolio-case__btn portfolio-case__btn--details"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
            >
              Подробнее
            </button>
            <button 
              className="portfolio-case__btn portfolio-case__btn--order"
              onClick={(e) => {
                e.stopPropagation();
                onOrder();
              }}
            >
              Заказать
            </button>
          </div>
        </div>
      </Card>

      {showFullView && (
        <div className="portfolio-case__full-view">
          <div className="portfolio-case__full-view-content">
            <button 
              className="portfolio-case__close-btn"
              onClick={handleCloseFullView}
            >
              ×
            </button>
            
            <h2>{title}</h2>
            <p>{description}</p>
            
            <PhotoGallery images={images} />
            
            <div className="portfolio-case__characteristics">
              <h3>Ключевые характеристики:</h3>
              <ul>
                {characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>
            
            <div className="portfolio-case__actions">
              <button 
                className="portfolio-case__btn portfolio-case__btn--order"
                onClick={onOrder}
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioCase;