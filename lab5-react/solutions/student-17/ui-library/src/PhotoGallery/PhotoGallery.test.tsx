import { render, screen, fireEvent } from '@testing-library/react';
import PhotoGallery from './PhotoGallery';

const mockImages = [
  'image1.jpg',
  'image2.jpg', 
  'image3.jpg'
];

describe('PhotoGallery Component', () => {
  test('renders empty state when no images provided', () => {
    render(<PhotoGallery images={[]} />);
    expect(screen.getByText('Нет изображений')).toBeInTheDocument();
  });

  test('renders main image and thumbnails when images provided', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // Check main image
    const mainImage = screen.getByAltText('Галерея изображение 1');
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
    
    // Check thumbnails
    mockImages.forEach((_, index) => {
      const thumbnail = screen.getByAltText(`Миниатюра ${index + 1}`);
      expect(thumbnail).toBeInTheDocument();
    });
  });

  test('navigates to next image when next button is clicked', () => {
    render(<PhotoGallery images={mockImages} />);
    
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);
    
    const mainImage = screen.getByAltText('Галерея изображение 2');
    expect(mainImage).toHaveAttribute('src', mockImages[1]);
  });

  test('navigates to previous image when previous button is clicked', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // First go to second image
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);
    
    // Then go back to first image
    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton);
    
    const mainImage = screen.getByAltText('Галерея изображение 1');
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  test('wraps around when navigating past last image', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // Go to last image
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton); // image 2
    fireEvent.click(nextButton); // image 3
    
    // Click next again should go to first image
    fireEvent.click(nextButton);
    
    const mainImage = screen.getByAltText('Галерея изображение 1');
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  test('wraps around when navigating before first image', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // Click previous from first image should go to last image
    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton);
    
    const mainImage = screen.getByAltText('Галерея изображение 3');
    expect(mainImage).toHaveAttribute('src', mockImages[2]);
  });

  test('changes image when thumbnail is clicked', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // Click on third thumbnail
    const thirdThumbnail = screen.getByAltText('Миниатюра 3');
    fireEvent.click(thirdThumbnail.parentElement!);
    
    const mainImage = screen.getByAltText('Галерея изображение 3');
    expect(mainImage).toHaveAttribute('src', mockImages[2]);
  });

  test('disables navigation buttons when only one image', () => {
    render(<PhotoGallery images={['single-image.jpg']} />);
    
    const prevButton = screen.getByText('‹');
    const nextButton = screen.getByText('›');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  test('highlights active thumbnail', () => {
    render(<PhotoGallery images={mockImages} />);
    
    // First thumbnail should be active initially
    const firstThumbnail = screen.getByAltText('Миниатюра 1').parentElement;
    expect(firstThumbnail).toHaveClass('photo-gallery__thumbnail--active');
    
    // Click on second thumbnail
    const secondThumbnail = screen.getByAltText('Миниатюра 2');
    fireEvent.click(secondThumbnail.parentElement!);
    
    // Second thumbnail should now be active
    expect(secondThumbnail.parentElement).toHaveClass('photo-gallery__thumbnail--active');
    // First thumbnail should not be active
    expect(firstThumbnail).not.toHaveClass('photo-gallery__thumbnail--active');
  });
});