import { jest } from '@jest/globals';

// Mock для handlers
jest.unstable_mockModule('../src/handlers.js', () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      handleStart: jest.fn(),
      handleCreateAd: jest.fn(),
      handleAnalytics: jest.fn(),
      handleHelp: jest.fn(),
      handlePlatformSelection: jest.fn(),
      handleSaveAd: jest.fn(),
      handleAdText: jest.fn()
    }))
  };
});

describe('AdCreator Bot', () => {
  let AdCreatorBot;
  let Telegraf;
  let session;

  beforeEach(async() => {
    jest.resetModules();
    
    // Создаем мок для telegraf
    const mockTelegraf = jest.fn().mockImplementation(() => ({
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn(),
      stop: jest.fn()
    }));

    const mockSession = jest.fn();

    jest.unstable_mockModule('telegraf', () => ({
      Telegraf: mockTelegraf,
      session: mockSession
    }));

    // Импортируем модули после настройки моков
    const telegrafModule = await import('telegraf');
    Telegraf = telegrafModule.Telegraf;
    session = telegrafModule.session;
    
    const AdCreatorBotModule = await import('../src/bot.js');
    AdCreatorBot = AdCreatorBotModule.default;
  });

  test('should create bot instance with token', () => {
    const bot = new AdCreatorBot('test_token');
    
    expect(bot).toBeDefined();
    expect(bot.bot).toBeDefined();
    expect(bot.handlers).toBeDefined();
    expect(Telegraf).toHaveBeenCalledWith('test_token');
  });

  test('should setup command handlers', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    expect(mockBotInstance.start).toHaveBeenCalledWith(expect.any(Function));
    expect(mockBotInstance.command).toHaveBeenCalledWith('create_ad', expect.any(Function));
    expect(mockBotInstance.command).toHaveBeenCalledWith('analytics', expect.any(Function));
    expect(mockBotInstance.command).toHaveBeenCalledWith('help', expect.any(Function));
  });

  test('should setup action handlers', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    expect(mockBotInstance.action).toHaveBeenCalledWith(/platform_/, expect.any(Function));
    expect(mockBotInstance.action).toHaveBeenCalledWith('save_ad', expect.any(Function));
    expect(mockBotInstance.action).toHaveBeenCalledWith('cancel_ad', expect.any(Function));
  });

  test('should setup text handler', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    expect(mockBotInstance.on).toHaveBeenCalledWith('text', expect.any(Function));
  });

  test('should use session middleware', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    const mockSessionMiddleware = 'session-middleware';
    session.mockReturnValue(mockSessionMiddleware);

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    expect(session).toHaveBeenCalled();
    expect(mockBotInstance.use).toHaveBeenCalledWith(mockSessionMiddleware);
  });

  test('should launch bot', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    const bot = new AdCreatorBot('test_token');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    bot.launch();
    
    expect(mockBotInstance.launch).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('🤖 AdCreator Bot запущен!');
    
    consoleSpy.mockRestore();
  });

  // Новые тесты для покрытия недостающих строк
  test('should handle cancel_ad action with session', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    // Получаем обработчик для cancel_ad
    const cancelAdHandler = mockBotInstance.action.mock.calls.find(
      call => call[0] === 'cancel_ad'
    )[1];
    
    const mockCtx = {
      session: {
        creatingAd: { platform: 'instagram', text: 'test' }
      },
      editMessageText: jest.fn()
    };
    
    cancelAdHandler(mockCtx);
    
    expect(mockCtx.session.creatingAd).toBeUndefined();
    expect(mockCtx.editMessageText).toHaveBeenCalledWith('❌ Создание объявления отменено');
  });

  test('should handle cancel_ad action without session', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    new AdCreatorBot('test_token');
    
    // Получаем обработчик для cancel_ad
    const cancelAdHandler = mockBotInstance.action.mock.calls.find(
      call => call[0] === 'cancel_ad'
    )[1];
    
    const mockCtx = {
      session: null,
      editMessageText: jest.fn()
    };
    
    cancelAdHandler(mockCtx);
    
    expect(mockCtx.editMessageText).toHaveBeenCalledWith('❌ Создание объявления отменено');
  });

  test('should handle text with creatingAd session', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    const bot = new AdCreatorBot('test_token');
    
    // Получаем обработчик для текста
    const textHandler = mockBotInstance.on.mock.calls.find(
      call => call[0] === 'text'
    )[1];
    
    const mockHandleAdText = jest.fn();
    bot.handlers.handleAdText = mockHandleAdText;
    
    const mockCtx = {
      session: {
        creatingAd: { platform: 'instagram' }
      }
    };
    
    textHandler(mockCtx);
    
    expect(mockHandleAdText).toHaveBeenCalledWith(mockCtx);
  });

  test('should not handle text without creatingAd session', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    const bot = new AdCreatorBot('test_token');
    
    // Получаем обработчик для текста
    const textHandler = mockBotInstance.on.mock.calls.find(
      call => call[0] === 'text'
    )[1];
    
    const mockHandleAdText = jest.fn();
    bot.handlers.handleAdText = mockHandleAdText;
    
    const mockCtx = {
      session: {} // нет creatingAd
    };
    
    textHandler(mockCtx);
    
    expect(mockHandleAdText).not.toHaveBeenCalled();
  });

  test('should not handle text without session', () => {
    const mockBotInstance = {
      use: jest.fn(),
      start: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      on: jest.fn(),
      launch: jest.fn()
    };

    Telegraf.mockImplementation(() => mockBotInstance);

    const bot = new AdCreatorBot('test_token');
    
    // Получаем обработчик для текста
    const textHandler = mockBotInstance.on.mock.calls.find(
      call => call[0] === 'text'
    )[1];
    
    const mockHandleAdText = jest.fn();
    bot.handlers.handleAdText = mockHandleAdText;
    
    const mockCtx = {
      session: null // нет сессии вообще
    };
    
    textHandler(mockCtx);
    
    expect(mockHandleAdText).not.toHaveBeenCalled();
  });
});
