import { PLATFORMS, PLATFORM_RULES, AD_TEMPLATES } from './constants.js';
import state from './state.js';

class AdHandlers {
  constructor(bot) {
    this.bot = bot;
  }

  handleStart(ctx) {
    ctx.reply(
      '👋 Добро пожаловать в AdCreator Bot!\n\n' +
      'Я помогу вам создавать эффективные рекламные кампании.\n\n' +
      'Доступные команды:\n' +
      '/create_ad - Создать новое объявление\n' +
      '/analytics - Посмотреть аналитику кампаний\n' +
      '/help - Помощь по использованию бота'
    );
  }

  handleCreateAd(ctx) {
    ctx.reply(
      '🎯 Выберите платформу для объявления:',
      {
        reply_markup: {
          inline_keyboard: [
            Object.values(PLATFORMS).map(platform => ({
              text: this.getPlatformIcon(platform) + platform,
              callback_data: `platform_${platform}`
            }))
          ]
        }
      }
    );
  }

  handlePlatformSelection(ctx) {
    const platform = ctx.callbackQuery.data.replace('platform_', '');
    const template = AD_TEMPLATES[platform];
    const rules = PLATFORM_RULES[platform];

    ctx.editMessageText(
      `📝 Шаблон для ${platform}:\n\n` +
      `**Структура:**\n${template.structure}\n\n` +
      `**Пример:**\n${template.example}\n\n` +
      '**Правила платформы:**\n' +
      `• Макс. длина: ${rules.maxLength} символов\n` +
      `• Хэштегов: до ${rules.hashtagsLimit}\n` +
      `• Изображение: ${rules.imageRequired ? 'обязательно' : 'не обязательно'}\n\n` +
      'Отправьте текст вашего объявления:'
    );

    ctx.session = ctx.session || {};
    ctx.session.creatingAd = { platform };
  }

  handleAdText(ctx) {
    if (!ctx.session?.creatingAd) {
      return ctx.reply('Пожалуйста, начните с команды /create_ad');
    }

    const { platform } = ctx.session.creatingAd;
    const text = ctx.message.text;
    const rules = PLATFORM_RULES[platform];

    // Проверка правил платформы
    const validation = this.validateAdText(text, platform);
    
    if (!validation.isValid) {
      return ctx.reply(`❌ Ошибка: ${validation.error}\n\nПожалуйста, исправьте текст и отправьте снова.`);
    }

    ctx.session.creatingAd.text = text;
    
    ctx.reply(
      '✅ Текст прошел проверку!\n\n' +
      `Длина: ${text.length}/${rules.maxLength} символов\n\n` +
      'Хотите сохранить это объявление?',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Сохранить', callback_data: 'save_ad' },
              { text: '❌ Отмена', callback_data: 'cancel_ad' }
            ]
          ]
        }
      }
    );
  }

  handleSaveAd(ctx) {
    const { creatingAd } = ctx.session;
    
    if (!creatingAd) {
      return ctx.answerCbQuery('Сессия создания объявления не найдена');
    }

    const campaign = state.addCampaign(ctx.from.id, {
      platform: creatingAd.platform,
      text: creatingAd.text,
      status: 'active'
    });

    delete ctx.session.creatingAd;

    ctx.editMessageText(
      '✅ Объявление успешно создано!\n\n' +
      `ID: ${campaign.id}\n` +
      `Платформа: ${campaign.platform}\n` +
      `Статус: ${campaign.status}\n\n` +
      'Используйте /analytics для отслеживания эффективности.'
    );
  }

  handleAnalytics(ctx) {
    const analytics = state.getAllAnalytics(ctx.from.id);

    if (analytics.length === 0) {
      return ctx.reply('📊 У вас пока нет активных кампаний. Создайте первую с помощью /create_ad');
    }

    let message = '📊 **Аналитика ваших кампаний:**\n\n';

    analytics.forEach(({ campaign, analytics: data }, index) => {
      message += `**Кампания ${index + 1}:**\n` +
                `Платформа: ${campaign.platform}\n` +
                `Охват: ${data.reach} чел.\n` +
                `Вовлеченность: ${data.engagement}\n` +
                `Клики: ${data.clicks}\n` +
                `Конверсии: ${data.conversions}\n` +
                `CTR: ${data.ctr}%\n\n`;

      // Рекомендации по оптимизации
      const recommendations = this.generateRecommendations(data, campaign.platform);
      if (recommendations.length > 0) {
        message += `**Рекомендации:**\n${recommendations.join('\n')}\n\n`;
      }
    });

    ctx.reply(message);
  }

  validateAdText(text, platform) {
    const rules = PLATFORM_RULES[platform];
    
    if (text.length > rules.maxLength) {
      return {
        isValid: false,
        error: `Превышена максимальная длина (${rules.maxLength} символов)`
      };
    }

    // Проверка хэштегов
    const hashtags = text.match(/#\w+/g) || [];
    if (hashtags.length > rules.hashtagsLimit) {
      return {
        isValid: false,
        error: `Слишком много хэштегов (максимум ${rules.hashtagsLimit})`
      };
    }

    return { isValid: true };
  }

  generateRecommendations(analytics, platform) {
    const recommendations = [];

    if (analytics.ctr < 2) {
      recommendations.push('• Увеличьте призыв к действию в тексте');
    }

    if (analytics.engagement < 20) {
      recommendations.push('• Попробуйте добавить вопрос к аудитории');
    }

    if (platform === 'instagram' && analytics.reach < 300) {
      recommendations.push('• Используйте больше релевантных хэштегов');
    }

    return recommendations;
  }

  getPlatformIcon(platform) {
    const icons = {
      [PLATFORMS.INSTAGRAM]: '📷 ',
      [PLATFORMS.FACEBOOK]: '👥 ',
      [PLATFORMS.TELEGRAM]: '✈️ ',
      [PLATFORMS.VK]: '🔵 '
    };
    return icons[platform] || '📱 ';
  }

  handleHelp(ctx) {
    ctx.reply(
      '🆘 **Помощь по AdCreator Bot**\n\n' +
      '**Создание объявления:**\n' +
      '1. Используйте /create_ad\n' +
      '2. Выберите платформу\n' +
      '3. Отправьте текст объявления\n' +
      '4. Бот проверит соответствие правилам\n\n' +
      '**Аналитика:**\n' +
      '• Используйте /analytics для просмотра статистики\n' +
      '• Получайте рекомендации по оптимизации\n\n' +
      '**Поддерживаемые платформы:**\n' +
      '• Instagram, Facebook, Telegram, VK'
    );
  }
}

export default AdHandlers;
