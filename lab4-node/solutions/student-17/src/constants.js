const PLATFORMS = {
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  TELEGRAM: 'telegram',
  VK: 'vk'
};

const PLATFORM_RULES = {
  instagram: {
    maxLength: 2200,
    hashtagsLimit: 30,
    imageRequired: true
  },
  facebook: {
    maxLength: 5000,
    hashtagsLimit: 0,
    imageRequired: false
  },
  telegram: {
    maxLength: 4096,
    hashtagsLimit: 0,
    imageRequired: false
  },
  vk: {
    maxLength: 4000,
    hashtagsLimit: 10,
    imageRequired: false
  }
};

const AD_TEMPLATES = {
  [PLATFORMS.INSTAGRAM]: {
    name: "Instagram Post",
    structure: "🎯 Заголовок\n\n📝 Основной текст\n\n🌟 Призыв к действию\n\n#{хэштеги}",
    example: "🎯 Распродажа 50%!\n\n📝 Только этой недели скидки на всю коллекцию!\n\n🌟 Успей купить!\n\n#распродажа #скидки #мода"
  },
  [PLATFORMS.FACEBOOK]: {
    name: "Facebook Post", 
    structure: "Заголовок\n\nОсновной текст с деталями\n\nСсылка и призыв к действию",
    example: "Новая коллекция уже в магазине!\n\nМы подготовили для вас самые модные новинки сезона. Качество гарантировано!\n\nПодробнее: example.com\n#новинки"
  },
  [PLATFORMS.TELEGRAM]: {
    name: "Telegram Post",
    structure: "📢 Заголовок\n\n📋 Описание\n\n🔗 Ссылка\n\n🏷️ Теги",
    example: "📢 Новое поступление!\n\n📋 В нашем магазине появились новые модели обуви\n\n🔗 Подробнее: example.com\n\n🏷️ #обувь #мода"
  },
  [PLATFORMS.VK]: {
    name: "VK Post",
    structure: "Заголовок\n\nТекст поста\n\nХэштеги",
    example: "Специальное предложение!\n\nТолько для подписчиков скидка 20% на весь ассортимент. Акция действует до конца недели!\n\n#акция #скидка #спецпредложение"
  }
};

const ANALYTICS_METRICS = [
  'reach',
  'engagement',
  'clicks',
  'conversions',
  'ctr'
];

module.exports = {
  PLATFORMS,
  PLATFORM_RULES,
  AD_TEMPLATES,
  ANALYTICS_METRICS
};