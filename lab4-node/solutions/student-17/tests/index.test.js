// Mock для dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

// Mock для бота - упрощенная версия
let mockBotInstance;

jest.mock('../src/bot', () => {
  return jest.fn().mockImplementation(() => {
    mockBotInstance = {
      launch: jest.fn(),
      bot: {
        stop: jest.fn()
      }
    };
    return mockBotInstance;
  });
});

describe('Index.js', () => {
  let originalEnv;
  let originalExit;
  let originalOnerr;

  beforeAll(() => {
    originalEnv = process.env;
    originalExit = process.exit;
    originalOnerr = process.once;
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    jest.clearAllMocks();
    process.exit = jest.fn();
    process.once = jest.fn();
  });

  afterAll(() => {
    process.env = originalEnv;
    process.exit = originalExit;
    process.once = originalOnerr;
  });

  test('should require dotenv', () => {
    const dotenv = require('dotenv');
    
    process.env.BOT_TOKEN = 'test_token';
    require('../src/index');
    
    expect(dotenv.config).toHaveBeenCalled();
  });

  test('should exit if BOT_TOKEN is not set', () => {
    delete process.env.BOT_TOKEN;
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    require('../src/index');
    
    expect(consoleSpy).toHaveBeenCalledWith(
      '❌ Ошибка: BOT_TOKEN не установлен в переменных окружения'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
    
    consoleSpy.mockRestore();
  });

  test('should start bot when BOT_TOKEN is set', () => {
    process.env.BOT_TOKEN = 'valid_token';
    const AdCreatorBot = require('../src/bot');
    
    require('../src/index');
    
    expect(AdCreatorBot).toHaveBeenCalledWith('valid_token');
    expect(mockBotInstance.launch).toHaveBeenCalled();
  });

  test('should setup graceful shutdown handlers', () => {
    process.env.BOT_TOKEN = 'test_token';
    
    require('../src/index');
    
    expect(process.once).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    expect(process.once).toHaveBeenCalledWith('SIGTERM', expect.any(Function));
    
    // Проверяем обработчики сигналов
    const sigintHandler = process.once.mock.calls.find(call => call[0] === 'SIGINT')[1];
    const sigtermHandler = process.once.mock.calls.find(call => call[0] === 'SIGTERM')[1];
    
    sigintHandler();
    expect(mockBotInstance.bot.stop).toHaveBeenCalledWith('SIGINT');
    
    sigtermHandler();
    expect(mockBotInstance.bot.stop).toHaveBeenCalledWith('SIGTERM');
  });
});