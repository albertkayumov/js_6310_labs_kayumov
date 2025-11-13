solution/student-17/
└── 17.md
└── README.md
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── jest.config.ts
    ├── package.json
    ├── public/
    │   └── vite.svg
    ├── src/                          # Исходный код 
    │   ├── App.css
    │   ├── App.test.tsx
    │   ├── App.tsx
    │   ├── assets/
    │   │   └── react.svg
    │   ├── index.css
    │   ├── main.tsx
    │   └── setupTests.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

└── pictures-for-readme/

└── ui-library/
    ├── .gitignore
    ├── eslint.config.js
    ├── jest.config.ts
    ├── package.json
    ├── src/
    │   ├── PortfolioCase/              # ЗАМЕНИЛ ProductCard на PortfolioCase
    │   │   ├── PortfolioCase.css
    │   │   ├── PortfolioCase.test.tsx
    │   │   └── PortfolioCase.tsx
    │   ├── PhotoGallery/               # ОСТАВИЛ для галереи изображений
    │   │   ├── PhotoGallery.css
    │   │   ├── PhotoGallery.test.tsx
    │   │   └── PhotoGallery.tsx
    │   ├── Card/                       # ОСТАВИЛ как базовый компонент
    │   │   ├── Card.css
    │   │   ├── Card.test.tsx
    │   │   └── Card.tsx
    │   ├── index.ts
    │   └── setupTests.ts
    ├── tsconfig.json
    └── vite.config.ts

# Описание проекта

Этот проект представляет собой библиотеку React компонентов и демонстрационное приложение для отображения кейсов портфолио. Проект разделен на две основные части:

- **ui-library/** - библиотека React компонентов с TypeScript
- **frontend/** - демонстрационное приложение с примерами кейсов портфолио

## Технологии

- React 18 с TypeScript
- Vite для сборки
- Jest + Testing Library для тестирования
- ESLint для линтинга
- CSS Modules для стилизации
- Tailwind CSS для утилитарных стилей

## Компоненты библиотеки

### 1. PortfolioCase
Основной компонент для отображения кейсов портфолио:
- Название работы и описание
- Ключевые характеристики проекта
- Основное изображение и галерея
- Модальное окно с полной информацией
- Две кнопки: "Подробнее" и "Заказать"
- Адаптивный дизайн

### 2. PhotoGallery
Компонент галереи для отображения нескольких изображений:
- Навигация между изображениями
- Миниатюры для быстрого переключения
- Индикатор текущего изображения
- Адаптивный дизайн

### 3. Card
Базовый компонент карточки:
- Универсальный контейнер для контента
- Тени и скругления
- Hover-эффекты
- Поддержка кликов

## Функциональные требования

✅ **Карточка содержит информацию о названии работы**  
✅ **Карточка содержит описание и ключевые характеристики**  
✅ **Карточка содержит изображение**  
✅ **При клике открывается модальное окно с полной информацией**  
✅ **Галерея изображений в модальном окне**  
✅ **Две кнопки: для просмотра кейса и для заказа**  
✅ **Все параметры передаются через props**  
✅ **Без использования сторонних UI библиотек**

## Инструкция по запуску

### Предварительные требования

- Node.js 18+
- npm

### Установка и запуск

1. **Клонирование репозитория**
```bash
git clone <repository-url>
cd solution/student-17
```

2. **Установка зависимостей UI Library**
```bash
cd ui-library
npm install
npm run build
```

3. **Запуск демо-приложения**
```bash
cd ../frontend
npm install
npm run dev
```

4. **Открытие в браузере**
Приложение будет доступно по адресу: http://localhost:3000

## Скрипты проекта

### UI Library (ui-library/)
- `npm run build` - сборка библиотеки
- `npm run dev` - разработка с вотчером
- `npm run test` - запуск тестов
- `npm run test:coverage` - запуск тестов с покрытием >90%
- `npm run lint` - проверка кодстайла
- `npm run lint:fix` - автоматическое исправление ошибок

### Frontend (frontend/)
- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка для production
- `npm run test` - запуск тестов
- `npm run lint` - проверка кодстайла

## Примеры работы приложения

## Тестирование

```bash
# Тестирование библиотеки компонентов
cd ui-library
npm run test
npm run test:coverage

# Тестирование приложения
cd ../frontend
npm run test
```

## Особенности реализации

- ✅ **Полная типизация TypeScript** - без использования `any`
- ✅ **Тестовое покрытие >90%** для всех компонентов
- ✅ **ESLint с строгими правилами** - 2 пробела, без точек с запятой
- ✅ **Адаптивный дизайн** - работает на всех устройствах
- ✅ **Доступность** - поддержка клавиатурной навигации
- ✅ **Модульная архитектура** - ES6 импорты/экспорты
- ✅ **CSS Modules** - изолированные стили компонентов