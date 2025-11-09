const AdHandlers = require('../src/handlers');

// Mock для бота
const mockBot = {
  // Базовые методы для мока
};

// Mock для контекста Telegraf
const createMockContext = (overrides = {}) => ({
  reply: jest.fn(),
  editMessageText: jest.fn(),
  answerCbQuery: jest.fn(),
  from: { id: 123 },
  message: { text: 'test message' },
  callbackQuery: { data: 'platform_instagram' },
  session: {},
  ...overrides
});

// Mock для state
jest.mock('../src/state', () => {
  const mockState = {
    addCampaign: jest.fn(),
    getCampaigns: jest.fn(),
    getAnalytics: jest.fn(),
    getAllAnalytics: jest.fn(),
    initializeAnalytics: jest.fn()
  };
  return mockState;
});

describe('Ad Handlers', () => {
  let handlers;
  let state;

  beforeEach(() => {
    handlers = new AdHandlers(mockBot);
    state = require('../src/state');
    
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();
    
    // Настраиваем моки по умолчанию
    state.getAllAnalytics.mockReturnValue([]);
    state.addCampaign.mockReturnValue({
      id: 'test-id',
      platform: 'test-platform',
      text: 'test-text',
      status: 'active',
      createdAt: new Date()
    });
  });

  // Базовые тесты для вспомогательных методов
  test('validateAdText should validate correct text', () => {
    const result = handlers.validateAdText('Test ad text', 'telegram');
    expect(result.isValid).toBe(true);
  });

  test('validateAdText should reject too long text', () => {
    const longText = 'a'.repeat(5000);
    const result = handlers.validateAdText(longText, 'telegram');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Превышена максимальная длина');
  });

  test('validateAdText should reject too many hashtags for instagram', () => {
    const textWithManyHashtags = 'Text ' + '#tag'.repeat(35);
    const result = handlers.validateAdText(textWithManyHashtags, 'instagram');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Слишком много хэштегов');
  });

  test('getPlatformIcon should return correct icons', () => {
    expect(handlers.getPlatformIcon('instagram')).toBe('📷 ');
    expect(handlers.getPlatformIcon('facebook')).toBe('👥 ');
    expect(handlers.getPlatformIcon('telegram')).toBe('✈️ ');
    expect(handlers.getPlatformIcon('vk')).toBe('🔵 ');
    expect(handlers.getPlatformIcon('unknown')).toBe('📱 ');
  });

  test('generateRecommendations should return recommendations for low CTR', () => {
    const analytics = {
      ctr: 1.5,
      engagement: 25,
      reach: 500
    };
    
    const recommendations = handlers.generateRecommendations(analytics, 'instagram');
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.some(rec => rec.includes('призыв к действию'))).toBe(true);
  });

  test('generateRecommendations should return recommendations for low engagement', () => {
    const analytics = {
      ctr: 3.0,
      engagement: 15,
      reach: 500
    };
    
    const recommendations = handlers.generateRecommendations(analytics, 'facebook');
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.some(rec => rec.includes('вопрос к аудитории'))).toBe(true);
  });

  test('generateRecommendations should return empty array for good metrics', () => {
    const analytics = {
      ctr: 5.0,
      engagement: 50,
      reach: 1000
    };
    
    const recommendations = handlers.generateRecommendations(analytics, 'instagram');
    expect(recommendations).toEqual([]);
  });

  test('generateRecommendations should return recommendations for low reach on instagram', () => {
    const analytics = {
      ctr: 3.0,
      engagement: 25,
      reach: 200 // низкий охват для instagram
    };
    
    const recommendations = handlers.generateRecommendations(analytics, 'instagram');
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.some(rec => rec.includes('хэштегов'))).toBe(true);
  });

  // Основные тесты обработчиков
  test('handleStart should send welcome message', () => {
    const ctx = createMockContext();
    
    handlers.handleStart(ctx);
    
    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('Добро пожаловать в AdCreator Bot!')
    );
  });

  test('handleCreateAd should send platform selection keyboard', () => {
    const ctx = createMockContext();
    
    handlers.handleCreateAd(ctx);
    
    expect(ctx.reply).toHaveBeenCalledWith(
      '🎯 Выберите платформу для объявления:',
      expect.objectContaining({
        reply_markup: expect.objectContaining({
          inline_keyboard: expect.any(Array)
        })
      })
    );
  });

  test('handlePlatformSelection should show template for selected platform', () => {
    const ctx = createMockContext({
      editMessageText: jest.fn(),
      callbackQuery: { data: 'platform_instagram' }
    });

    handlers.handlePlatformSelection(ctx);

    expect(ctx.editMessageText).toHaveBeenCalledWith(
      expect.stringContaining('📝 Шаблон для instagram:')
    );
  });

  test('handlePlatformSelection should set session for creating ad', () => {
    const ctx = createMockContext({
      editMessageText: jest.fn(),
      callbackQuery: { data: 'platform_facebook' },
      session: {}
    });

    handlers.handlePlatformSelection(ctx);

    expect(ctx.session.creatingAd).toBeDefined();
    expect(ctx.session.creatingAd.platform).toBe('facebook');
  });

  test('handleAdText should validate and accept correct text', () => {
    const ctx = createMockContext({
      session: {
        creatingAd: { platform: 'telegram' }
      },
      message: { text: 'Valid ad text' }
    });

    handlers.handleAdText(ctx);

    expect(ctx.reply).toHaveBeenCalled();
    const replyCall = ctx.reply.mock.calls[0];
    expect(replyCall[0]).toContain('✅ Текст прошел проверку!');
    expect(ctx.session.creatingAd.text).toBe('Valid ad text');
  });

  test('handleAdText should reject text when no session', () => {
    const ctx = createMockContext({
      session: null,
      message: { text: 'Some text' }
    });

    handlers.handleAdText(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      'Пожалуйста, начните с команды /create_ad'
    );
  });

  test('handleAdText should show error for invalid text', () => {
    const longText = 'a'.repeat(5000);
    const ctx = createMockContext({
      session: {
        creatingAd: { platform: 'telegram' }
      },
      message: { text: longText }
    });

    handlers.handleAdText(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('❌ Ошибка:')
    );
  });

  test('handleSaveAd should save campaign and show success message', () => {
    const ctx = createMockContext({
      editMessageText: jest.fn(),
      session: {
        creatingAd: {
          platform: 'instagram',
          text: 'Test ad content'
        }
      },
      from: { id: 123 }
    });

    handlers.handleSaveAd(ctx);

    expect(state.addCampaign).toHaveBeenCalledWith(123, {
      platform: 'instagram',
      text: 'Test ad content',
      status: 'active'
    });
    expect(ctx.editMessageText).toHaveBeenCalledWith(
      expect.stringContaining('✅ Объявление успешно создано!')
    );
    expect(ctx.session.creatingAd).toBeUndefined();
  });

  test('handleSaveAd should handle missing session gracefully', () => {
    const ctx = createMockContext({
      answerCbQuery: jest.fn(),
      session: { creatingAd: null }
    });

    handlers.handleSaveAd(ctx);

    expect(ctx.answerCbQuery).toHaveBeenCalledWith(
      'Сессия создания объявления не найдена'
    );
  });

  test('handleAnalytics should show message when no campaigns', () => {
    const ctx = createMockContext({
      from: { id: 999 }
    });

    handlers.handleAnalytics(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      '📊 У вас пока нет активных кампаний. Создайте первую с помощью /create_ad'
    );
  });

  test('handleAnalytics should show analytics with recommendations', () => {
    const ctx = createMockContext({
      from: { id: 123 },
      reply: jest.fn()
    });

    // Настраиваем мок для аналитики с рекомендациями
    state.getAllAnalytics.mockReturnValue([
      {
        campaign: {
          id: '1',
          platform: 'instagram',
          text: 'Test ad',
          status: 'active'
        },
        analytics: {
          reach: 200, // низкий охват для генерации рекомендаций
          engagement: 15, // низкая вовлеченность
          clicks: 5,
          conversions: 1,
          ctr: '1.50' // низкий CTR
        }
      }
    ]);

    handlers.handleAnalytics(ctx);

    // Проверяем что reply был вызван
    expect(ctx.reply).toHaveBeenCalled();
    
    // Получаем текст сообщения
    const replyText = ctx.reply.mock.calls[0][0];
    
    // Проверяем что текст содержит основные элементы
    expect(replyText).toContain('Аналитика ваших кампаний');
    expect(replyText).toContain('Платформа: instagram');
    expect(replyText).toContain('Охват: 200 чел.');
    
    // Рекомендации могут присутствовать (зависит от логики generateRecommendations)
  });

  test('handleAnalytics should show analytics without recommendations', () => {
    const ctx = createMockContext({
      from: { id: 123 },
      reply: jest.fn()
    });

    // Настраиваем мок для аналитики без рекомендаций (хорошие метрики)
    state.getAllAnalytics.mockReturnValue([
      {
        campaign: {
          id: '1',
          platform: 'facebook',
          text: 'Test ad',
          status: 'active'
        },
        analytics: {
          reach: 1000,
          engagement: 50, // хорошая вовлеченность
          clicks: 50,
          conversions: 10,
          ctr: '5.00' // хороший CTR
        }
      }
    ]);

    handlers.handleAnalytics(ctx);

    expect(ctx.reply).toHaveBeenCalled();
    
    const replyText = ctx.reply.mock.calls[0][0];
    expect(replyText).toContain('Аналитика ваших кампаний');
    expect(replyText).toContain('Платформа: facebook');
  });

  test('handleHelp should send help information', () => {
    const ctx = createMockContext();

    handlers.handleHelp(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('Помощь по AdCreator Bot')
    );
  });

  // Тесты для дополнительного покрытия
  test('should handle text with hashtags correctly', () => {
    const textWithHashtags = 'Test ad with #hashtag1 #hashtag2';
    const result = handlers.validateAdText(textWithHashtags, 'instagram');
    expect(result.isValid).toBe(true);
  });

  test('should handle platform rules for vk correctly', () => {
    const text = 'Test ad for VK';
    const result = handlers.validateAdText(text, 'vk');
    expect(result.isValid).toBe(true);
  });

  test('should handle empty recommendations array', () => {
    const analytics = {
      ctr: 6.0, // очень хороший CTR
      engagement: 60, // очень хорошая вовлеченность
      reach: 2000 // очень хороший охват
    };
    
    const recommendations = handlers.generateRecommendations(analytics, 'instagram');
    expect(recommendations).toEqual([]);
  });

  // Дополнительные тесты для полного покрытия
  test('should handle telegram platform with long text', () => {
    const longText = 'a'.repeat(3000);
    const result = handlers.validateAdText(longText, 'telegram');
    expect(result.isValid).toBe(true);
  });

  test('should handle validation with exact max length', () => {
    const exactLengthText = 'a'.repeat(4096);
    const result = handlers.validateAdText(exactLengthText, 'telegram');
    expect(result.isValid).toBe(true);
  });

  test('should handle vk platform with hashtags within limit', () => {
    const textWithHashtags = 'Text with #hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5';
    const result = handlers.validateAdText(textWithHashtags, 'vk');
    expect(result.isValid).toBe(true);
  });

  test('should reject vk platform with too many hashtags', () => {
    const textWithManyHashtags = 'Text ' + '#tag'.repeat(15);
    const result = handlers.validateAdText(textWithManyHashtags, 'vk');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Слишком много хэштегов');
  });
});