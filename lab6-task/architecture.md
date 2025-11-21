# Архитектура проекта

## Обзор
Проект будет реализован с двумя основными проектами:
### frontend - основное приложение сайта рекламного агентства
### ui-library - библиотека переиспользуемых компонентов

## Структура frontend
frontend/
├── public/ !!!
│   ├── vite.svg
│   ├── favicon.ico !!! убрать?
│   └── images/ !!! убрать?
│       ├── logo.png убрать?
│       ├── hero-bg.jpg убрать?
│       └── portfolio/ убрать?
├── src/ !!!
│   ├── assets/
│   │   └── react.svg
│   ├── components/ !!!
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── HeroSection/
│   │   ├── ServicesSection/
│   │   ├── PortfolioSection/
│   │   ├── ContactForm/
│   │   └── Modal/
│   ├── pages/ !!!         
│   │   ├── HomePage/
│   │   ├── PortfolioPage/
│   │   ├── ServicesPage/
│   │   ├── AboutPage/
│   │   └── ContactPage/
│   ├── utils/ !!!
│   ├── types/ !!!
│   ├── App.css  
│   ├── App.test.tsx
│   ├── App.tsx  
│   ├── index.css        
│   ├── main.tsx
│   └── setupTests.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
└── vite.config.js

## Структура ui-library
ui-library/
├── src/
│   ├── Button/ !!!
│   ├── Input/ !!!
│   ├── Textarea/ !!!
│   ├── Card/
│   ├── PortfolioCase/
│   ├── PhotoGallery/
│   ├── index.ts
│   └── setupTests.ts  
├── package.json
├── eslint.config.js
├── jest.config.js
├── tsconfig.json
├── vite.config.js
└── .gitignore

## Используемые библиотеки

### Runtime зависимости:
- "react": "^19.2.0" - UI библиотека
- "react-dom": "^19.2.0" - рендеринг
- "react-router-dom": "^6.8.0" - маршрутизация !!!
- "@my-app/ui-library" - локальные ui компоненты !!!
- "framer-motion": "^10.0.0" - анимации !!!
- "react-hook-form": "^7.48.0" - управление формами !!!

### Dev зависимости:
- "typescript": "~5.9.3" - статическая типизация
- "vite": "^7.1.7" - сборщик и dev-сервер
- "eslint": "^9.36.0" - линтинг кода
- "jest": "^30.2.0" - тестирование

## Компоненты

### ui-library компоненты:
- **Button** - базовая кнопка с вариантами стилей
- **Input** - однострочное поле ввода
- **Textarea** - многострочное поле для текста
- **Card** - карточка для контента
- **PortfolioCase** - компонент кейса портфолио
- **PhotoGallery** - галерея изображений

### frontend компоненты:
- **Header** - верхняя панель с навигацией
- **Footer** - подвал сайта
- **HeroSection** - главная секция с призывом к действию
- **ServicesSection** - секция услуг агентства
- **PortfolioSection** - секция портфолио
- **ContactForm** - форма обратной связи
- **Modal** - модальное окно

## Структура роутинга и отображаемых страниц
- Главная страница (`/`) - лендинг со всеми секциями
- Портфолио (`/portfolio`) - страница с кейсами
- Услуги (`/services`) - детальное описание услуг
- О нас (`/about`) - информация о компании
- Контакты (`/contact`) - страница с контактами и формой