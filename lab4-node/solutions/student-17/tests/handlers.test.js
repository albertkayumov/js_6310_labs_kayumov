import { jest } from '@jest/globals';

// Mock для constants
jest.unstable_mockModule('../src/constants.js', () => ({
  PLATFORMS: {
    INSTAGRAM: 'instagram',
    FACEBOOK: 'facebook',
    TELEGRAM: 'telegram',
    VK: 'vk'
  },
  PLATFORM_RULES: {
    instagram: {
      maxLength: 2200,
      hashtagsLimit: 30,
      imageRequired: true
    },
    facebook: {
      maxLength: 5000,
      hashtagsLimit: 10,
      imageRequired: true
    },
    telegram: {
      maxLength: 4096,
      hashtagsLimit: 20,
      imageRequired: false
    },
    vk: {
      maxLength: 5000,
      hashtagsLimit: 10,
      imageRequired: true
    }
  },
  AD_TEMPLATES: {
    instagram: {
      structure: 'Заголовок → Описание → Призыв к действию → Хэштеги',
      example: 'Пример для Instagram'
    },
    facebook: {
      structure: 'Заголовок → Основной текст → Ссылка → Хэштеги',
      example: 'Пример для Facebook'
    },
    telegram: {
      structure: 'Заголовок → Текст → Призыв к действию',
      example: 'Пример для Telegram'
    },
    vk: {
      structure: 'Заголовок → Текст → Кнопка действия → Хэштеги',
      example: 'Пример для VK'
    }
  }
}));

// Mock для state
jest.unstable_mockModule('../src/state.js', () => ({
  default: {
    addCampaign: jest.fn(),
    getCampaigns: jest.fn(),
    getAnalytics: jest.fn(),
    getAllAnalytics: jest.fn(),
    initializeAnalytics: jest.fn()
  }
}));

describe('Ad Handlers', () => {
  let handlers;
  let state;
  let AdHandlers;

  beforeEach(async() => {
    // Импортируем модули после настройки моков
    state = await import('../src/state.js');
    const AdHandlersModule = await import('../src/handlers.js');
    AdHandlers = AdHandlersModule.default;
    
    handlers = new AdHandlers({});
    
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();
    
    // Настраиваем моки по умолчанию
    state.default.getAllAnalytics.mockReturnValue([]);
    state.default.addCampaign.mockReturnValue({
      id: 'test-id',
      platform: 'test-platform',
      text: 'test-text',
      status: 'active',
      createdAt: new Date()
    });
  });

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
      reach: 200
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

    expect(state.default.addCampaign).toHaveBeenCalledWith(123, {
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

    state.default.getAllAnalytics.mockReturnValue([
      {
        campaign: {
          id: '1',
          platform: 'instagram',
          text: 'Test ad',
          status: 'active'
        },
        analytics: {
          reach: 200,
          engagement: 15,
          clicks: 5,
          conversions: 1,
          ctr: '1.50'
        }
      }
    ]);

    handlers.handleAnalytics(ctx);

    expect(ctx.reply).toHaveBeenCalled();
    const replyText = ctx.reply.mock.calls[0][0];
    expect(replyText).toContain('Аналитика ваших кампаний');
    expect(replyText).toContain('Платформа: instagram');
    expect(replyText).toContain('Охват: 200 чел.');
  });

  test('handleHelp should send help information', () => {
    const ctx = createMockContext();

    handlers.handleHelp(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('Помощь по AdCreator Bot')
    );
  });
});
