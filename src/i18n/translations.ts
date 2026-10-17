export type Language = 'en' | 'ru'

export interface TranslationStrings {
  appTitle: string
  appSubtitle: string
  headerTitle: string
  badgeStatus: string
  online: string
  connecting: string
  localMode: string
  latency: string
  soundOn: string
  soundOff: string
  clearChat: string
  closeChat: string
  openChat: string
  newMessages: string
  session: string
  placeholder: string
  send: string
  sendHint: string
  attachImage: string
  supportAgent: string
  you: string
  systemNotice: string
  welcomeSystem: string
  welcomeMessage: string
  typing: string
  scrollToBottom: string
  cmdHelpDesc: string
  cmdStatusDesc: string
  cmdPingDesc: string
  cmdClearDesc: string
  cmdAgentDesc: string
  botResponses: string[]
  // Hero page translations
  heroBadge: string
  heroTitle1: string
  heroTitle2: string
  heroDesc: string
  heroOpenBtn: string
  heroTechBtn: string
  feat1Title: string
  feat1Desc: string
  feat2Title: string
  feat2Desc: string
  feat3Title: string
  feat3Desc: string
  footerStatus: string
  footerWidgetReady: string
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'TeleChat // Web Messenger',
    appSubtitle: 'Modern Dark Theme Live Chat Widget',
    headerTitle: 'Live Support',
    badgeStatus: 'Live',
    online: 'Online',
    connecting: 'Connecting...',
    localMode: 'Ready',
    latency: 'ms',
    soundOn: 'Sound enabled',
    soundOff: 'Sound muted',
    clearChat: 'Clear chat history',
    closeChat: 'Close chat [ESC]',
    openChat: 'CHAT WITH US',
    newMessages: 'New message',
    session: 'Session',
    placeholder: 'Type your message here...',
    send: 'Send message',
    sendHint: 'Enter to send • Shift+Enter for new line',
    attachImage: 'Attach screenshot or image',
    supportAgent: 'Support Agent',
    you: 'You',
    systemNotice: 'SYSTEM NOTICE',
    welcomeSystem: 'Secure chat session initialized. An agent is ready to assist you.',
    welcomeMessage: 'Hello! Welcome to TeleChat Support. How can we help you today? You can ask a question or use quick commands: /help, /status, /ping.',
    typing: 'Agent is typing...',
    scrollToBottom: 'Scroll to bottom',
    cmdHelpDesc: 'Command help',
    cmdStatusDesc: 'Check status',
    cmdPingDesc: 'Check latency',
    cmdClearDesc: 'Clear messages',
    cmdAgentDesc: 'Request agent',
    botResponses: [
      'Thank you for reaching out! A support specialist is reviewing your inquiry.',
      'Understood. Let me check the details for you right away.',
      'Could you provide any additional context so we can resolve this faster?',
      'Got it! We are on it and will assist you shortly.',
      'Your request has been logged. Feel free to attach any relevant screenshots.',
    ],
    heroBadge: 'PROFESSIONAL DARK THEME CHAT',
    heroTitle1: 'Modern Web Messenger',
    heroTitle2: 'with sleek dark aesthetics',
    heroDesc: 'A responsive floating chat widget built with Tailwind CSS v4 and React. Features real-time messaging, sound alerts, screenshot attachments, and bilingual support.',
    heroOpenBtn: 'OPEN CHAT WIDGET',
    heroTechBtn: 'VIEW SPECIFICATIONS',
    feat1Title: 'Dark Theme Aesthetics',
    feat1Desc: 'Obsidian and deep slate surfaces with curated emerald accents, subtle borders, and smooth transitions.',
    feat2Title: 'Floating Corner Widget',
    feat2Desc: 'Compact bottom-right trigger with live status indicators, pulse animations, and unread badges.',
    feat3Title: 'Bilingual & Accessible',
    feat3Desc: 'Instant EN/RU language switcher, keyboard shortcuts (Enter / Esc), and audio notification chime.',
    footerStatus: 'TELECHAT WEB • SECURE CLIENT MESSENGER',
    footerWidgetReady: 'WIDGET ACTIVE IN BOTTOM-RIGHT',
  },
  ru: {
    appTitle: 'TeleChat // Веб-мессенджер',
    appSubtitle: 'Виджет чата в современной темной теме',
    headerTitle: 'Служба поддержки',
    badgeStatus: 'Онлайн',
    online: 'В сети',
    connecting: 'Подключение...',
    localMode: 'Готов к работе',
    latency: 'мс',
    soundOn: 'Звук включен',
    soundOff: 'Звук отключен',
    clearChat: 'Очистить историю чата',
    closeChat: 'Закрыть чат [ESC]',
    openChat: 'НАПИСАТЬ В ЧАТ',
    newMessages: 'Новое сообщение',
    session: 'Сессия',
    placeholder: 'Введите сообщение...',
    send: 'Отправить сообщение',
    sendHint: 'Enter для отправки • Shift+Enter для новой строки',
    attachImage: 'Прикрепить скриншот или изображение',
    supportAgent: 'Специалист поддержки',
    you: 'Вы',
    systemNotice: 'СИСТЕМНОЕ СООБЩЕНИЕ',
    welcomeSystem: 'Защищенная сессия чата инициализирована. Оператор готов ответить.',
    welcomeMessage: 'Здравствуйте! Добро пожаловать в службу поддержки TeleChat. Чем мы можем вам помочь? Вы также можете использовать быстрые команды: /help, /status, /ping.',
    typing: 'Специалист печатает...',
    scrollToBottom: 'Вниз к новым сообщениям',
    cmdHelpDesc: 'Справка по командам',
    cmdStatusDesc: 'Статус соединения',
    cmdPingDesc: 'Проверить пинг',
    cmdClearDesc: 'Очистить диалог',
    cmdAgentDesc: 'Позвать оператора',
    botResponses: [
      'Спасибо за обращение! Наш специалист уже изучает ваш вопрос.',
      'Понял вас. Сейчас проверю информацию по вашему запросу.',
      'Не могли бы вы уточнить детали, чтобы мы решили вопрос быстрее?',
      'Принято в работу! Скоро предоставим подробный ответ.',
      'Запрос зафиксирован. При необходимости вы можете прикрепить скриншот.',
    ],
    heroBadge: 'ПРОФЕССИОНАЛЬНЫЙ ЧАТ В ТЕМНОЙ ТЕМЕ',
    heroTitle1: 'Современный веб-мессенджер',
    heroTitle2: 'в элегантной темной теме',
    heroDesc: 'Отзывчивый плавающий виджет чата на Tailwind CSS v4 и React. Поддерживает обмен сообщениями, звуковые уведомления, вложения и переключение языка.',
    heroOpenBtn: 'ОТКРЫТЬ ВИДЖЕТ ЧАТА',
    heroTechBtn: 'ТЕХНИЧЕСКИЕ ДАННЫЕ',
    feat1Title: 'Эстетика темной темы',
    feat1Desc: 'Глубокие сланцевые и обсидиановые тона с изумрудными акцентами и плавными переходами.',
    feat2Title: 'Плавающий виджет в углу',
    feat2Desc: 'Компактная кнопка в правом нижнем углу с индикатором онлайна, анимацией пульса и счетчиком.',
    feat3Title: 'Выбор языка и звук',
    feat3Desc: 'Мгновенное переключение EN/RU, поддержка горячих клавиш (Enter / Esc) и звуковой сигнал.',
    footerStatus: 'TELECHAT WEB • КЛИЕНТСКИЙ МЕССЕНДЖЕР',
    footerWidgetReady: 'ВИДЖЕТ ГОТОВ В ПРАВОМ НИЖНЕМ УГЛУ',
  },
}
