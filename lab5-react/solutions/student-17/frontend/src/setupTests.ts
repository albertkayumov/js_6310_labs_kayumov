import '@testing-library/jest-dom';

// Мокаем глобальные функции браузера которые не реализованы в JSDOM
Object.defineProperty(window, 'alert', {
  value: jest.fn(),
  writable: true
});