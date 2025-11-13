import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Мокаем компоненты ui-library чтобы тестировать только App логику
jest.mock('@my-app/ui-library', () => ({
  Card: ({ children, ...props }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  PhotoGallery: ({ images }: any) => (
    <div data-testid="photo-gallery">
      {images.map((img: string, index: number) => (
        <img key={index} src={img} alt={`Gallery image ${index + 1}`} />
      ))}
    </div>
  ),
  PortfolioCase: ({ 
    title, 
    description, 
    characteristics, 
    onViewDetails, 
    onOrder 
  }: any) => (
    <div data-testid="portfolio-case">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {characteristics.map((char: string, index: number) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
      <button onClick={onViewDetails}>Подробнее</button>
      <button onClick={onOrder}>Заказать</button>
    </div>
  ),
}));

describe('App Component', () => {
  beforeEach(() => {
    // Очищаем все моки перед каждым тестом
    jest.clearAllMocks();
  });

  test('renders header with correct text', () => {
    render(<App />);
    
    expect(screen.getByText('Портфолио наших работ')).toBeInTheDocument();
    expect(screen.getByText('Примеры реализованных проектов с использованием React компонентов')).toBeInTheDocument();
  });

  test('renders demo gallery section', () => {
    render(<App />);
    
    expect(screen.getByText('Отдельные компоненты:')).toBeInTheDocument();
    expect(screen.getByText('Демонстрация PhotoGallery')).toBeInTheDocument();
    expect(screen.getByTestId('photo-gallery')).toBeInTheDocument();
  });

  test('renders portfolio cases section', () => {
    render(<App />);
    
    expect(screen.getByText('Портфолио кейсы:')).toBeInTheDocument();
    
    // Проверяем что отображаются все портфолио кейсы
    expect(screen.getByText('Корпоративный сайт для ООО "ТехноПро"')).toBeInTheDocument();
    expect(screen.getByText('Интернет-магазин "Модный стиль"')).toBeInTheDocument();
    expect(screen.getByText('Лендинг для стартапа "EcoLife"')).toBeInTheDocument();
  });

  test('renders portfolio cases with correct content', () => {
    render(<App />);
    
    // Проверяем описание проектов
    expect(screen.getByText('Разработка современного адаптивного корпоративного сайта с системой управления контентом.')).toBeInTheDocument();
    expect(screen.getByText('Создание полнофункционального интернет-магазина одежды с системой онлайн-оплаты.')).toBeInTheDocument();
    expect(screen.getByText('Разработка продающей посадочной страницы для экологического стартапа.')).toBeInTheDocument();
    
    // Проверяем характеристики проектов
    expect(screen.getByText('Адаптивный дизайн')).toBeInTheDocument();
    expect(screen.getByText('Система корзины и заказов')).toBeInTheDocument();
    expect(screen.getByText('Высокая конверсия')).toBeInTheDocument();
  });

  test('renders all action buttons', () => {
    render(<App />);
    
    const detailsButtons = screen.getAllByText('Подробнее');
    const orderButtons = screen.getAllByText('Заказать');
    
    expect(detailsButtons).toHaveLength(3);
    expect(orderButtons).toHaveLength(3);
  });

  test('handles view details button click', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    const detailsButtons = screen.getAllByText('Подробнее');
    await user.click(detailsButtons[0]);
    
    expect(consoleSpy).toHaveBeenCalledWith('Просмотр деталей: Корпоративный сайт для ООО "ТехноПро" (ID: 1)');
    
    consoleSpy.mockRestore();
  });

  test('handles order button click', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    const orderButtons = screen.getAllByText('Заказать');
    await user.click(orderButtons[1]);
    
    expect(consoleSpy).toHaveBeenCalledWith('Заказ проекта: Интернет-магазин "Модный стиль" (ID: 2)');
    
    consoleSpy.mockRestore();
  });

  test('renders footer with current year', () => {
    render(<App />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} UI Library Demo. Все права защищены.`)).toBeInTheDocument();
  });

  test('renders Card component in demo section', () => {
    render(<App />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(0);
  });
});