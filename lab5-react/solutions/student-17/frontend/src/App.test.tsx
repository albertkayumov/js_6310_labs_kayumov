import { render } from '@testing-library/react'

import { getItems } from '../data-access'
import App from './App'

// Создаем мок с правильными типами
jest.mock('../data-access', () => ({
  getItems: jest.fn(),
  createItem: jest.fn(),
}))

// Определяем тип для элемента
interface MockItem {
  id: number;
  name: string;
}

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    // Мокаем данные с правильным типом
    (getItems as jest.Mock).mockResolvedValue([] as MockItem[])
    
    render(<App />)
  })

  it('displays items from API', async () => {
    const mockItems: MockItem[] = [
      { id: 1, name: 'Test Item 1' },
      { id: 2, name: 'Test Item 2' },
    ];

    (getItems as jest.Mock).mockResolvedValue(mockItems)

    const { findByText } = render(<App />)

    expect(await findByText('Test Item 1')).toBeInTheDocument()
    expect(await findByText('Test Item 2')).toBeInTheDocument()
  })

  it('handles empty items list', async () => {
    (getItems as jest.Mock).mockResolvedValue([] as MockItem[])

    const { findByText } = render(<App />)

    // Проверяем, что приложение рендерится без ошибок при пустом списке
    expect(await findByText('Items')).toBeInTheDocument()
  })
})