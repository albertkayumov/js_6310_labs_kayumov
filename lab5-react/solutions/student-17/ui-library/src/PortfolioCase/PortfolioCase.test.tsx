import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioCase from './PortfolioCase';

const mockProps = {
  title: 'Веб-сайт для компании',
  description: 'Современный корпоративный сайт',
  characteristics: ['Адаптивный дизайн', 'Быстрая загрузка', 'SEO-оптимизация'],
  images: ['image1.jpg', 'image2.jpg'],
  onViewDetails: jest.fn(),
  onOrder: jest.fn(),
};

describe('PortfolioCase Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders portfolio case with all required information', () => {
    render(<PortfolioCase {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText('Ключевые характеристики:')).toBeInTheDocument();
    mockProps.characteristics.forEach(char => {
      expect(screen.getByText(char)).toBeInTheDocument();
    });
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Заказать')).toBeInTheDocument();
  });

  test('displays first image in card', () => {
    render(<PortfolioCase {...mockProps} />);
    
    const image = screen.getByAltText(mockProps.title);
    expect(image).toHaveAttribute('src', mockProps.images[0]);
  });

  test('calls onViewDetails when details button is clicked', () => {
    render(<PortfolioCase {...mockProps} />);
    
    fireEvent.click(screen.getByText('Подробнее'));
    expect(mockProps.onViewDetails).toHaveBeenCalledTimes(1);
  });

  test('calls onOrder when order button is clicked', () => {
    render(<PortfolioCase {...mockProps} />);
    
    fireEvent.click(screen.getByText('Заказать'));
    expect(mockProps.onOrder).toHaveBeenCalledTimes(1);
  });

  test('opens full view when card is clicked', () => {
    render(<PortfolioCase {...mockProps} />);
    
    fireEvent.click(screen.getByText(mockProps.title));
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  test('closes full view when close button is clicked', () => {
    render(<PortfolioCase {...mockProps} />);
    
    // Open full view
    fireEvent.click(screen.getByText(mockProps.title));
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
    
    // Close full view
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
  });

  test('stops event propagation when buttons are clicked', () => {
    render(<PortfolioCase {...mockProps} />);
    
    const detailsButton = screen.getByText('Подробнее');
    const orderButton = screen.getByText('Заказать');
    
    fireEvent.click(detailsButton);
    fireEvent.click(orderButton);
    
    // Full view should not open when buttons are clicked
    expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
  });
});