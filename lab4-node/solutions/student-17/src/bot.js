const { Telegraf, session } = require('telegraf');
const AdHandlers = require('./handlers');

class AdCreatorBot {
  constructor(token) {
    this.bot = new Telegraf(token);
    this.handlers = new AdHandlers(this.bot);
    this.setupMiddlewares();
    this.setupHandlers();
  }

  setupMiddlewares() {
    this.bot.use(session());
  }

  setupHandlers() {
    // Команды
    this.bot.start((ctx) => this.handlers.handleStart(ctx));
    this.bot.command('create_ad', (ctx) => this.handlers.handleCreateAd(ctx));
    this.bot.command('analytics', (ctx) => this.handlers.handleAnalytics(ctx));
    this.bot.command('help', (ctx) => this.handlers.handleHelp(ctx));

    // Callback-обработчики
    this.bot.action(/platform_/, (ctx) => this.handlers.handlePlatformSelection(ctx));
    this.bot.action('save_ad', (ctx) => this.handlers.handleSaveAd(ctx));
    this.bot.action('cancel_ad', (ctx) => {
      if (ctx.session) {
        delete ctx.session.creatingAd;
      }
      ctx.editMessageText('❌ Создание объявления отменено');
    });

    // Обработка текста объявления
    this.bot.on('text', (ctx) => {
      if (ctx.session && ctx.session.creatingAd) {
        this.handlers.handleAdText(ctx);
      }
    });
  }

  launch() {
    this.bot.launch();
    console.log('🤖 AdCreator Bot запущен!');
  }
}

module.exports = AdCreatorBot;