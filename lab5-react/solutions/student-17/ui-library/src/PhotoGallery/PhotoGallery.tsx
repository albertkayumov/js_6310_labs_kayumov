import React, { useState } from 'react';
import './PhotoGallery.css';

export interface PhotoGalleryProps {
  images: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (images.length === 0) {
    return <div className="photo-gallery__empty">Нет изображений</div>;
  }

  return (
    <div className="photo-gallery">
      <div className="photo-gallery__main">
        <button 
          className="photo-gallery__nav photo-gallery__nav--prev"
          onClick={handlePrevious}
          disabled={images.length <= 1}
        >
          ‹
        </button>
        
        <div className="photo-gallery__image-container">
          <img 
            src={images[selectedImageIndex]} 
            alt={`Галерея изображение ${selectedImageIndex + 1}`}
            className="photo-gallery__image"
          />
        </div>
        
        <button 
          className="photo-gallery__nav photo-gallery__nav--next"
          onClick={handleNext}
          disabled={images.length <= 1}
        >
          ›
        </button>
      </div>

      {images.length > 1 && (
        <div className="photo-gallery__thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`photo-gallery__thumbnail ${
                index === selectedImageIndex ? 'photo-gallery__thumbnail--active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image} 
                alt={`Миниатюра ${index + 1}`}
                className="photo-gallery__thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;