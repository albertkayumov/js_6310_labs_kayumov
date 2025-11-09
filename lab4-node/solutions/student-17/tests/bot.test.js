describe('AdCreator Bot', () => {
  test('should create bot instance with token', () => {
    jest.isolateModules(() => {
      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: jest.fn(),
          start: jest.fn(),
          command: jest.fn(),
          action: jest.fn(),
          on: jest.fn(),
          launch: jest.fn()
        })),
        session: jest.fn()
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({})));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      
      expect(bot).toBeDefined();
      expect(bot.bot).toBeDefined();
      expect(bot.handlers).toBeDefined();
    });
  });

  test('should setup command handlers', () => {
    jest.isolateModules(() => {
      const mockCommand = jest.fn();
      const mockStart = jest.fn();

      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: jest.fn(),
          start: mockStart,
          command: mockCommand,
          action: jest.fn(),
          on: jest.fn(),
          launch: jest.fn()
        })),
        session: jest.fn()
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({
        handleStart: jest.fn(),
        handleCreateAd: jest.fn(),
        handleAnalytics: jest.fn(),
        handleHelp: jest.fn()
      })));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      
      // start регистрируется через bot.start(), а не bot.command()
      expect(mockStart).toHaveBeenCalledWith(expect.any(Function));
      expect(mockCommand).toHaveBeenCalledWith('create_ad', expect.any(Function));
      expect(mockCommand).toHaveBeenCalledWith('analytics', expect.any(Function));
      expect(mockCommand).toHaveBeenCalledWith('help', expect.any(Function));
    });
  });

  test('should setup action handlers', () => {
    jest.isolateModules(() => {
      const mockAction = jest.fn();

      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: jest.fn(),
          start: jest.fn(),
          command: jest.fn(),
          action: mockAction,
          on: jest.fn(),
          launch: jest.fn()
        })),
        session: jest.fn()
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({
        handlePlatformSelection: jest.fn(),
        handleSaveAd: jest.fn()
      })));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      
      expect(mockAction).toHaveBeenCalledWith(/platform_/, expect.any(Function));
      expect(mockAction).toHaveBeenCalledWith('save_ad', expect.any(Function));
      expect(mockAction).toHaveBeenCalledWith('cancel_ad', expect.any(Function));
    });
  });

  test('should setup text handler', () => {
    jest.isolateModules(() => {
      const mockOn = jest.fn();

      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: jest.fn(),
          start: jest.fn(),
          command: jest.fn(),
          action: jest.fn(),
          on: mockOn,
          launch: jest.fn()
        })),
        session: jest.fn()
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({
        handleAdText: jest.fn()
      })));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      
      expect(mockOn).toHaveBeenCalledWith('text', expect.any(Function));
    });
  });

  test('should use session middleware', () => {
    jest.isolateModules(() => {
      const mockUse = jest.fn();
      const mockSession = jest.fn(() => 'session-middleware');

      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: mockUse,
          start: jest.fn(),
          command: jest.fn(),
          action: jest.fn(),
          on: jest.fn(),
          launch: jest.fn()
        })),
        session: mockSession
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({})));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      
      expect(mockSession).toHaveBeenCalled();
      expect(mockUse).toHaveBeenCalledWith('session-middleware');
    });
  });

  test('should launch bot', () => {
    jest.isolateModules(() => {
      const mockLaunch = jest.fn();

      jest.mock('telegraf', () => ({
        Telegraf: jest.fn(() => ({
          use: jest.fn(),
          start: jest.fn(),
          command: jest.fn(),
          action: jest.fn(),
          on: jest.fn(),
          launch: mockLaunch
        })),
        session: jest.fn()
      }));

      jest.mock('../src/handlers', () => jest.fn(() => ({})));

      const AdCreatorBot = require('../src/bot').default || require('../src/bot');
      const bot = new AdCreatorBot('test_token');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      bot.launch();
      
      expect(mockLaunch).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('🤖 AdCreator Bot запущен!');
      
      consoleSpy.mockRestore();
    });
  });
});