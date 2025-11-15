export const PLATFORMS = {
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook', 
  TELEGRAM: 'telegram',
  VK: 'vk'
};

export const PLATFORM_RULES = {
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
};

export const AD_TEMPLATES = {
  instagram: {
    structure: 'Заголовок → Описание → Призыв к действию → Хэштеги',
    example: '🔥 Акция! Только сегодня скидка 50%!\n\nУспей купить лучшие товары по выгодной цене!\n\n👉 Переходи по ссылке в профиле\n\n#акция #скидка #покупки'
  },
  facebook: {
    structure: 'Заголовок → Основной текст → Ссылка → Хэштеги',
    example: '🎉 Специальное предложение для наших подписчиков!\n\nПолучите эксклюзивный доступ к новым продуктам первыми. Ограниченное количество!\n\nПодробности: ссылка\n\n#новинка #эксклюзив'
  },
  telegram: {
    structure: 'Заголовок → Текст → Призыв к действию',
    example: '🚀 Новый запуск!\n\nПредставляем наш новый сервис для бизнеса. Увеличивайте эффективность вашей команды с помощью современных инструментов.\n\nНачать бесплатно: @yourbot'
  },
  vk: {
    structure: 'Заголовок → Текст → Кнопка действия → Хэштеги',
    example: '📢 Важное объявление!\n\nМы запускаем новую программу лояльности для постоянных клиентов. Получайте бонусы за каждую покупку!\n\nУзнать больше: ссылка\n\n#бонусы #лояльность'
  }
};
