import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

// Мокаем библиотеку UI компонентов если нужно
jest.mock('@my-app/ui-library', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  PhotoGallery: ({ images }: { images: string[] }) => (
    <div data-testid="photo-gallery">
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Gallery image ${index}`} />
      ))}
    </div>
  ),
  PortfolioCase: ({
    title,
    description,
    characteristics,
    onViewDetails,
    onOrder
  }: {
    title: string
    description: string
    characteristics: string[]
    images: string[]
    onViewDetails: () => void
    onOrder: () => void
  }) => (
    <div data-testid="portfolio-case">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {characteristics.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
      <button onClick={onViewDetails}>Подробнее</button>
      <button onClick={onOrder}>Заказать</button>
    </div>
  )
}))

describe('App', () => {
  beforeEach(() => {
    // Очищаем console.log перед каждым тестом
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<App />)
    
    // Проверяем, что заголовок рендерится
    expect(screen.getByText('Портфолио наших работ')).toBeInTheDocument()
  })

  it('displays all portfolio cases', () => {
    render(<App />)
    
    // Проверяем, что все кейсы портфолио отображаются
    expect(screen.getByText('Корпоративный сайт для ООО "ТехноПро"')).toBeInTheDocument()
    expect(screen.getByText('Интернет-магазин "Модный стиль"')).toBeInTheDocument()
    expect(screen.getByText('Лендинг для стартапа "EcoLife"')).toBeInTheDocument()
  })

  it('displays demo gallery section', () => {
    render(<App />)
    
    expect(screen.getByText('Демонстрация PhotoGallery')).toBeInTheDocument()
    expect(screen.getByText('Отдельные компоненты:')).toBeInTheDocument()
  })

  it('handles view details button click', async () => {
    // Мокаем alert и console.log
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<App />)
    const user = userEvent.setup()

    // Находим первую кнопку "Подробнее" и кликаем
    const viewDetailsButtons = screen.getAllByText('Подробнее')

    await user.click(viewDetailsButtons[0])

    // Проверяем, что alert был вызван
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Корпоративный сайт для ООО "ТехноПро"')
    )
    
    // Проверяем, что console.log был вызван
    expect(console.log).toHaveBeenCalledWith(
      'Просмотр деталей: Корпоративный сайт для ООО "ТехноПро" (ID: 1)'
    )
  })

  it('handles order button click', async () => {
    // Мокаем alert и console.log
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<App />)
    const user = userEvent.setup()

    // Находим первую кнопку "Заказать" и кликаем
    const orderButtons = screen.getAllByText('Заказать')

    await user.click(orderButtons[0])

    // Проверяем, что alert был вызван
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Корпоративный сайт для ООО "ТехноПро"')
    )
    
    // Проверяем, что console.log был вызван
    expect(console.log).toHaveBeenCalledWith(
      'Заказ проекта: Корпоративный сайт для ООО "ТехноПро" (ID: 1)'
    )
  })

  it('displays current year in footer', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    
    expect(screen.getByText(`© ${currentYear} UI Library Demo. Все права защищены.`)).toBeInTheDocument()
  })

  it('displays all characteristics for portfolio cases', () => {
    render(<App />)
    
    // Проверяем характеристики первого проекта
    expect(screen.getByText('Адаптивный дизайн')).toBeInTheDocument()
    expect(screen.getByText('CMS система')).toBeInTheDocument()
    expect(screen.getByText('SEO-оптимизация')).toBeInTheDocument()
    
    // Проверяем характеристики второго проекта
    expect(screen.getByText('Система корзины и заказов')).toBeInTheDocument()
    expect(screen.getByText('Интеграция с платежными системами')).toBeInTheDocument()
  })
})