import './App.css'
import { Card, PhotoGallery, PortfolioCase } from '@my-app/ui-library'

const mockPortfolioCases = [
  {
    id: 1,
    title: 'Корпоративный сайт для ООО "ТехноПро"',
    description: 'Разработка современного адаптивного корпоративного сайта с системой управления контентом.',
    characteristics: [
      'Адаптивный дизайн',
      'CMS система',
      'SEO-оптимизация', 
      'Интеграция с CRM',
      'Многоязычность'
    ],
    images: [
      'https://placehold.co/400x200/007bff/ffffff/png?text=Project+1',
      'https://placehold.co/400x200/28a745/ffffff/png?text=Project+1',
      'https://placehold.co/400x200/dc3545/ffffff/png?text=Project+1'
    ]
  },
  {
    id: 2,
    title: 'Интернет-магазин "Модный стиль"',
    description: 'Создание полнофункционального интернет-магазина одежды с системой онлайн-оплаты.',
    characteristics: [
      'Система корзины и заказов',
      'Интеграция с платежными системами',
      'Личный кабинет пользователя',
      'Система отзывов и рейтингов',
      'Мобильное приложение'
    ],
    images: [
      'https://placehold.co/400x200/28a745/ffffff/png?text=Project+2',
      'https://placehold.co/400x200/007bff/ffffff/png?text=Project+2'
    ]
  },
  {
    id: 3,
    title: 'Лендинг для стартапа "EcoLife"',
    description: 'Разработка продающей посадочной страницы для экологического стартапа.',
    characteristics: [
      'Высокая конверсия',
      'A/B тестирование',
      'Интеграция с аналитикой',
      'Формы захвата лидов',
      'Оптимизация скорости'
    ],
    images: [
      'https://placehold.co/400x200/007bff/ffffff/png?text=Project+3'
    ]
  }
]

// Демонстрация использования отдельных компонентов Card и PhotoGallery
const DemoGallery = () => {
  const demoImages = [
    'https://placehold.co/400x200/007bff/ffffff/png?text=Демонстрация PhotoGallery1',
    'https://placehold.co/400x200/28a745/ffffff/png?text=Демонстрация PhotoGallery2',
    'https://placehold.co/400x200/dc3545/ffffff/png?text=Демонстрация PhotoGallery3'
  ]

  return (
    <Card>
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Демонстрация PhotoGallery</h3>
        <PhotoGallery images={demoImages} />
      </div>
    </Card>
  )
}

function App() {
  const handleViewDetails = (title: string, id: number) => {
    console.log(`Просмотр деталей: ${title} (ID: ${id})`)
    alert(`Детальная информация о проекте: ${title}\nID проекта: ${id}`)
  }

  const handleOrder = (title: string, id: number) => {
    console.log(`Заказ проекта: ${title} (ID: ${id})`)
    alert(`Форма заказа для: ${title}\nID проекта: ${id}`)
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Портфолио наших работ</h1>
        <p>Примеры реализованных проектов с использованием React компонентов</p>
      </header>

      <main className="app-main">
        <div className="components-demo">
          <h2>Отдельные компоненты:</h2>
          <DemoGallery />
        </div>
        
Демонстрация PortfolioCase

        <div className="portfolio-section">
          <h2>PortfolioCase:</h2>
          <div className="portfolio-grid">
            {mockPortfolioCases.map((portfolioCase) => (
              <PortfolioCase
                key={portfolioCase.id}
                title={portfolioCase.title}
                description={portfolioCase.description}
                characteristics={portfolioCase.characteristics}
                images={portfolioCase.images}
                onViewDetails={() => handleViewDetails(portfolioCase.title, portfolioCase.id)}
                onOrder={() => handleOrder(portfolioCase.title, portfolioCase.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© {currentYear} UI Library Demo. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App