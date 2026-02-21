const LANG_KEY = "flowexchange-lang";
const getLang = () => localStorage.getItem(LANG_KEY) || "ru";

/** CoinGecko: курсы USDT и BTC в рублях (рыночные, без API-ключа). Альтернатива Google Finance, у которого нет публичного API. */
const COINGECKO_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=tether,bitcoin&vs_currencies=rub";

/** URL веб-приложения Google Apps Script: при нажатии «Продолжить» данные заявки отправляются в таблицу. */
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxOkZfndoEp6TXlCYjspI8L80lAnHx_ZvmphMRKvD9oMusO1Hg-RWvidBWibRku7ivrfQ/exec";
const setLang = (lang) => {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "ru" ? "ru" : "en";
};

(function setInitialLang() {
  const lang = getLang();
  if (document.documentElement) document.documentElement.lang = lang === "ru" ? "ru" : "en";
  const btn = document.getElementById("langSwitch");
  if (btn) btn.textContent = lang === "ru" ? "RU" : "EN";
})();

const translations = {
  navExchange: { ru: "Обмен", en: "Exchange" },
  navFaq: { ru: "FAQ", en: "FAQ" },
  navContact: { ru: "Связаться с нами!", en: "Contact us!" },
  refreshIn: { ru: "Обновление через", en: "Refresh in" },
  navLogin: { ru: "Войти", en: "Log in" },
  navRegister: { ru: "Регистрация", en: "Sign up" },
  heroEyebrow: { ru: "Easy Exchange", en: "Easy Exchange" },
  heroTitle: {
    ru: "FlowExchange удобный сервис для обмена цифровых активов.",
    en: "FlowExchange is a convenient service for exchanging digital assets.",
  },
  heroCopy: {
    ru: "Мы сделали интерфейс максимально понятным, а процесс обмена — быстрым и комфортным для пользователей из разных стран.",
    en: "We made the interface as clear as possible and the exchange process fast and comfortable for users from different countries.",
  },
  heroCta: { ru: "Начать обмен", en: "Start exchange" },
  heroContact: { ru: "Связаться с нами!", en: "Contact us!" },
  heroMore: { ru: "Узнать больше", en: "Learn more" },
  exchangeEyebrow: { ru: "Exchange Engine", en: "Exchange Engine" },
  exchangeTitle: {
    ru: "Обмен электронных и наличных направлений",
    en: "Electronic and cash exchange directions",
  },
  rateLabel: { ru: "Курс", en: "Rate" },
  labelGive: { ru: "Отдаете", en: "You give" },
  labelGet: { ru: "Получаете", en: "You get" },
  labelContact: { ru: "Контакт", en: "Contact" },
  contactPlaceholder: {
    ru: "@username или email@example.com",
    en: "@username or email@example.com",
  },
  agreementPrefix: { ru: "Я принимаю ", en: "I accept " },
  agreementMiddle: { ru: " и ", en: " and " },
  linkTerms: { ru: "условия сервиса", en: "terms of service" },
  linkAml: { ru: "AML-проверки", en: "AML verification" },
  submitBtn: { ru: "Продолжить", en: "Continue" },
  formErrorContact: {
    ru: "Укажите Telegram или почту.",
    en: "Please specify Telegram or email.",
  },
  formErrorAgreement: {
    ru: "Не приняты условия сервиса и AML-проверки.",
    en: "Terms of service and AML verification have not been accepted.",
  },
  formErrorBoth: {
    ru: "Укажите Telegram или почту. Примите условия сервиса и AML-проверки.",
    en: "Please specify Telegram or email. Accept the terms of service and AML verification.",
  },
  formSuccess: {
    ru: "Заявка принята. Подтверждение отправлено в выбранный канал.",
    en: "Request accepted. Confirmation has been sent to the selected channel.",
  },
  stats1Title: { ru: "4 года", en: "4 years" },
  stats1Text: {
    ru: "Стабильной работы на рынке цифрового обмена",
    en: "Of stable operation in the digital exchange market",
  },
  stats2Title: { ru: "100%", en: "100%" },
  stats2Text: {
    ru: "Цифровых активов, проходят AML проверку",
    en: "Of digital assets pass AML verification",
  },
  stats3Title: { ru: "24 / 7", en: "24 / 7" },
  stats3Text: {
    ru: "Поддержка процессов и контроль качества операций",
    en: "Process support and quality control of operations",
  },
  ratesEyebrow: { ru: "Top Pairs", en: "Top Pairs" },
  ratesTitle: { ru: "Актуальные направления", en: "Popular directions" },
  footerAgreement: { ru: "Пользовательское соглашение", en: "User agreement" },
  footerAml: { ru: "AML-политика", en: "AML policy" },
  footerHours: { ru: "Ежедневно 11:00-20:00 (UTC+3)", en: "Daily 11:00-20:00 (UTC+3)" },
  footerSupport: { ru: "Сервисная поддержка без выходных", en: "Support available every day" },
  optionCashRub: { ru: "Наличные RUB", en: "Cash RUB" },
  optionUsdt: { ru: "USDT TRC20", en: "USDT TRC20" },
  optionBtc: { ru: "BTC", en: "BTC" },
  optionEth: { ru: "ETH", en: "ETH" },
  faqEyebrow: { ru: "Legal & Support", en: "Legal & Support" },
  faqTitle: { ru: "Ответы на основные вопросы", en: "Frequently asked questions" },
  faqQ1: { ru: "Как подать заявку на обмен?", en: "How to submit an exchange request?" },
  faqA1: { ru: "Выберите направление, укажите контакт и сумму, подтвердите согласие с условиями сервиса.", en: "Choose direction, enter contact and amount, confirm agreement with the terms of service." },
  faqQ2: { ru: "Как обрабатывается AML-проверка?", en: "How is AML verification handled?" },
  faqA2Before: { ru: "Каждая операция проходит автоматический контроль риска и может требовать уточнения данных. Больше можете узнать ", en: "Each operation undergoes automatic risk control and may require additional data. Learn more " },
  faqHere: { ru: "тут", en: "here" },
  faqQ3: { ru: "Когда доступна поддержка?", en: "When is support available?" },
  faqA3: { ru: "Операторы доступны ежедневно в рабочее время сервиса, по кнопке связаться с нами.", en: "Operators are available daily during service hours, via the contact us button." },
  termsTitle: { ru: "Пользовательское соглашение", en: "User agreement" },
  termsSubtitle: { ru: "Сервис FlowExchange", en: "FlowExchange service" },
  amlTitle: { ru: "Политика AML / CTF и KYC", en: "AML / CTF and KYC Policy" },
  amlSubtitle: { ru: "Сервис FlowExchange", en: "FlowExchange service" },
  authSignInEyebrow: { ru: "Sign In", en: "Sign In" },
  authSignInTitle: { ru: "Вход в аккаунт", en: "Log in" },
  authEmailPlaceholder: { ru: "E-mail", en: "E-mail" },
  authPasswordPlaceholder: { ru: "Пароль", en: "Password" },
  authLoginBtn: { ru: "Войти", en: "Log in" },
  authRegisterEyebrow: { ru: "Create Profile", en: "Create Profile" },
  authRegisterTitle: { ru: "Создать аккаунт", en: "Create account" },
  authNamePlaceholder: { ru: "Имя", en: "Name" },
  authRegisterBtn: { ru: "Зарегистрироваться", en: "Sign up" },

  terms_1_h: { ru: "1. Стороны соглашения", en: "1. Parties to the agreement" },
  terms_1_1: { ru: "Сторонами настоящего соглашения являются Исполнитель и Заказчик, совместно именуемые «Стороны».", en: "The parties to this agreement are the Contractor and the Customer, jointly referred to as the «Parties»." },
  terms_2_h: { ru: "2. Термины и определения", en: "2. Terms and definitions" },
  terms_2_1: { ru: "Автоматизированный продукт интернет-обслуживания — продукт, предоставляемый Исполнителем, позволяющий Заказчику осуществлять операции по обмену, покупке и продаже цифровых и/или электронных валют в соответствии с правилами FlowExchange.", en: "Automated online service product — a product provided by the Contractor enabling the Customer to perform exchange, purchase and sale of digital and/or electronic currencies in accordance with FlowExchange rules." },
  terms_2_2: { ru: "Заказчик — физическое лицо, акцептирующее условия настоящего соглашения и правила сервиса FlowExchange.", en: "Customer — an individual accepting the terms of this agreement and the FlowExchange service rules." },
  terms_2_3: { ru: "Цифровые и/или электронные валюты — условные единицы платёжных систем, используемые в электронных расчётах.", en: "Digital and/or electronic currencies — conventional units of payment systems used in electronic settlements." },
  terms_2_4: { ru: "Заявка — электронная информация, предоставленная Заказчиком для использования средств Исполнителя и подтверждающая согласие с условиями сервиса.", en: "Request — electronic information provided by the Customer for the use of the Contractor's resources and confirming acceptance of the service terms." },
  terms_2_5: { ru: "Сервис — система предоставления интернет-услуг FlowExchange.", en: "Service — the FlowExchange internet service delivery system." },
  terms_2_6: { ru: "Операция — перевод электронной и/или цифровой валюты от плательщика к получателю.", en: "Transaction — transfer of electronic and/or digital currency from the payer to the recipient." },
  terms_2_7: { ru: "Платёжная система — программно-аппаратный продукт третьей стороны.", en: "Payment system — third-party software and hardware product." },
  terms_3_h: { ru: "3. Обязательства сторон", en: "3. Obligations of the parties" },
  terms_3_1_h: { ru: "3.1. Обязательства Исполнителя", en: "3.1. Contractor's obligations" },
  terms_3_1_1: { ru: "Предоставлять Заказчику доступ к сервису FlowExchange.", en: "To provide the Customer with access to the FlowExchange service." },
  terms_3_1_2: { ru: "Обеспечивать конфиденциальность информации Заказчика в рамках технических возможностей сервиса.", en: "To ensure confidentiality of the Customer's information within the technical capabilities of the service." },
  terms_3_2_h: { ru: "3.2. Обязательства Заказчика", en: "3.2. Customer's obligations" },
  terms_3_2_1: { ru: "Соблюдать правила сервиса FlowExchange.", en: "To comply with the FlowExchange service rules." },
  terms_3_2_2: { ru: "Предоставлять достоверные и актуальные данные.", en: "To provide accurate and up-to-date information." },
  terms_3_2_3: { ru: "Не использовать сервис в незаконных целях.", en: "Not to use the service for illegal purposes." },
  terms_4_h: { ru: "4. Завершение соглашения", en: "4. Termination of the agreement" },
  terms_4_1: { ru: "Соглашение считается завершённым при прекращении использования сервиса Заказчиком.", en: "The agreement is deemed terminated when the Customer ceases to use the service." },
  terms_5_h: { ru: "5. Прочие условия", en: "5. Other terms" },
  terms_5_1: { ru: "Соглашение регулируется законодательством страны регистрации Исполнителя.", en: "The agreement is governed by the laws of the country of the Contractor's registration." },
  terms_5_2: { ru: "Споры разрешаются путём переговоров.", en: "Disputes shall be resolved through negotiations." },
  terms_5_3: { ru: "Соглашение вступает в силу с момента акцепта.", en: "The agreement enters into force upon acceptance." },
  terms_6_h: { ru: "6. Ограничение ответственности", en: "6. Limitation of liability" },
  terms_6_1: { ru: "Исполнитель не несёт ответственности за убытки, возникшие вследствие неправильного использования сервиса или нарушения условий соглашения Заказчиком.", en: "The Contractor is not liable for losses arising from misuse of the service or the Customer's breach of the agreement." },
  terms_6_2: { ru: "Исполнитель не гарантирует непрерывную и бесперебойную работу сервиса.", en: "The Contractor does not guarantee continuous and uninterrupted operation of the service." },
  terms_6_3: { ru: "Коммуникация по всем сделкам осуществляется исключительно через чат сайта и официальные каналы FlowExchange. Общение через иные источники осуществляется на риск Заказчика.", en: "All transaction communications are conducted exclusively through the site chat and official FlowExchange channels. Communication through other sources is at the Customer's risk." },
  terms_7_h: { ru: "7. Разрешение споров", en: "7. Dispute resolution" },
  terms_7_1: { ru: "Споры и разногласия разрешаются путём переговоров.", en: "Disputes and disagreements shall be resolved through negotiations." },
  terms_7_2: { ru: "При невозможности урегулирования спор подлежит рассмотрению в компетентном суде.", en: "If settlement is not possible, the dispute shall be referred to a court of competent jurisdiction." },
  terms_8_h: { ru: "8. Срок действия", en: "8. Term" },
  terms_8_1: { ru: "Соглашение действует до момента прекращения использования сервиса.", en: "The agreement remains in effect until the service is no longer used." },
  terms_8_2: { ru: "Соглашение может быть завершено по соглашению сторон либо при нарушении его условий.", en: "The agreement may be terminated by mutual consent or in the event of a breach of its terms." },
  terms_9_h: { ru: "9. Работа с банковскими картами", en: "9. Banking cards" },
  terms_9_1: { ru: "Сервис FlowExchange не осуществляет операции с банковскими картами.", en: "The FlowExchange service does not process banking card transactions." },
  terms_9_2: { ru: "Заявки, связанные с использованием банковских карт и банковских счетов, не принимаются и не обрабатываются.", en: "Requests related to the use of banking cards and bank accounts are not accepted or processed." },
  terms_10_h: { ru: "10. Проведение обменных операций", en: "10. Exchange operations" },
  terms_10_1: { ru: "Использование сервиса для незаконных переводов и мошеннических действий запрещено.", en: "Use of the service for illegal transfers and fraudulent activities is prohibited." },
  terms_10_2: { ru: "В случае невозможности автоматического выполнения заявки средства возвращаются Заказчику в течение 24 часов либо зачисляются согласно условиям сервиса.", en: "If automatic execution of a request is not possible, funds are returned to the Customer within 24 hours or credited in accordance with the service terms." },
  terms_10_3: { ru: "Исполнитель вправе передавать информацию о переводах правоохранительным органам и администрациям платёжных систем по запросу.", en: "The Contractor may disclose transfer information to law enforcement and payment system administrators upon request." },
  terms_11_h: { ru: "11. Видео-подтверждение", en: "11. Video verification" },
  terms_11_1: { ru: "При подозрении в несоответствии данных Исполнитель вправе приостановить заявку и запросить видео-подтверждение транзакции.", en: "If data discrepancy is suspected, the Contractor may suspend the request and require video verification of the transaction." },
  terms_12_h: { ru: "12. Отказ от обязательств", en: "12. Waiver of obligations" },
  terms_12_1: { ru: "Исполнитель имеет право отказаться от выполнения заявки без объяснения причин.", en: "The Contractor has the right to refuse to execute a request without stating reasons." },
  terms_12_2: { ru: "Данное правило применяется ко всем клиентам без исключений.", en: "This rule applies to all clients without exception." },
  terms_13_h: { ru: "13. Политика противодействия легализации доходов и финансированию терроризма (AML)", en: "13. Anti-money laundering and counter-terrorism financing policy (AML)" },
  terms_13_1: { ru: "Сервис FlowExchange применяет меры и практики, направленные на предотвращение легализации доходов и финансирования терроризма (AML).", en: "The FlowExchange service applies measures and practices aimed at preventing money laundering and terrorism financing (AML)." },
  terms_13_2: { ru: "FlowExchange придаёт приоритет предотвращению использования сервиса в незаконных целях.", en: "FlowExchange prioritises preventing the use of the service for illegal purposes." },
  terms_13_3: { ru: "Пользователям запрещается использовать сервис для:", en: "Users are prohibited from using the service for:" },
  terms_13_3_li1: { ru: "легализации незаконно полученных средств;", en: "laundering of illegally obtained funds;" },
  terms_13_3_li2: { ru: "финансирования терроризма;", en: "terrorism financing;" },
  terms_13_3_li3: { ru: "мошенничества;", en: "fraud;" },
  terms_13_3_li4: { ru: "приобретения запрещённых товаров и услуг.", en: "purchasing prohibited goods and services." },
  terms_13_4: { ru: "Для всех заявок действуют следующие требования:", en: "The following requirements apply to all requests:" },
  terms_13_4_li1: { ru: "отправитель и получатель должны быть одним и тем же лицом;", en: "the sender and recipient must be the same person;" },
  terms_13_4_li2: { ru: "переводы третьим лицам запрещены;", en: "transfers to third parties are prohibited;" },
  terms_13_4_li3: { ru: "вся информация должна быть актуальной и достоверной;", en: "all information must be current and accurate;" },
  terms_13_4_li4: { ru: "использование анонимных прокси и анонимных подключений запрещено.", en: "use of anonymous proxies and anonymous connections is prohibited." },
  terms_13_5: { ru: "При подозрениях в незаконных действиях администрация FlowExchange вправе:", en: "If illegal activity is suspected, the FlowExchange administration may:" },
  terms_13_5_li1: { ru: "приостановить выполнение операции;", en: "suspend the transaction;" },
  terms_13_5_li2: { ru: "запросить документы, подтверждающие личность пользователя;", en: "request identity documents;" },
  terms_13_5_li3: { ru: "запросить дополнительную информацию по платежу;", en: "request additional information about the payment;" },
  terms_13_5_li4: { ru: "удержать комиссию в размере 9% от суммы платежа.", en: "retain a commission of 9% of the payment amount." },
  terms_13_6: { ru: "Информация о пользователе может быть предоставлена:", en: "User information may be disclosed:" },
  terms_13_6_li1: { ru: "по запросу правоохранительных органов;", en: "upon request from law enforcement;" },
  terms_13_6_li2: { ru: "по решению суда;", en: "by court order;" },
  terms_13_6_li3: { ru: "по запросам администраций платёжных систем.", en: "upon requests from payment system administrations." },
  terms_13_7: { ru: "FlowExchange, его администрация и сотрудники не несут ответственности за незаконное использование сервиса третьими лицами.", en: "FlowExchange, its administration and employees are not liable for illegal use of the service by third parties." },
  terms_13_8: { ru: "Пользователь, осуществляя обмен, подтверждает согласие с настоящей AML-политикой.", en: "By making an exchange, the user confirms acceptance of this AML policy." },
  terms_13_9: { ru: "Если риск транзакции превышает 70% либо количество сигнальных меток превышает 10% при проведении AML-проверки на независимом ресурсе, выполнение сделки временно приостанавливается. В этом случае Исполнитель вправе потребовать верификацию личности пользователя.", en: "If the transaction risk exceeds 70% or the number of risk flags exceeds 10% during AML verification on an independent resource, execution of the transaction is temporarily suspended. In this case the Contractor may require user identity verification." },
  terms_13_10: { ru: "Использование счетов и корпоративных карт юридических лиц и индивидуальных предпринимателей запрещено.", en: "Use of accounts and corporate cards of legal entities and individual entrepreneurs is prohibited." },
  terms_14_h: { ru: "14. Персональные данные", en: "14. Personal data" },
  terms_14_1: { ru: "Используя сервис FlowExchange, Заказчик даёт согласие на обработку персональных данных в рамках работы сервиса.", en: "By using the FlowExchange service, the Customer consents to the processing of personal data in the course of the service." },

  aml_1_h: { ru: "Политика противодействия легализации доходов, полученных преступным путём (Anti-Money Laundering Policy)", en: "Anti-Money Laundering Policy" },
  aml_1_p1: { ru: "Сервис FlowExchange предостерегает пользователей от попыток использования сервиса для легализации денежных средств, полученных преступным путём, финансирования терроризма, совершения незаконных действий любого рода, а также использования сервиса для приобретения запрещённых товаров и услуг.", en: "The FlowExchange service warns users against attempting to use the service for money laundering, terrorism financing, any illegal activity, or purchasing prohibited goods and services." },
  aml_1_p2: { ru: "Легализация доходов, полученных преступным путём, означает сокрытие незаконного происхождения денежных средств путём их преобразования в активы или инвестиции, создающие видимость законного происхождения.", en: "Money laundering means concealing the illegal origin of funds by converting them into assets or investments that appear legitimate." },
  aml_2_h: { ru: "Общие положения", en: "General provisions" },
  aml_2_p1: { ru: "В целях предотвращения операций незаконного характера сервис FlowExchange устанавливает следующие требования ко всем объявлениям (заявкам), создаваемым Пользователем:", en: "To prevent illegal operations, the FlowExchange service sets the following requirements for all listings (requests) created by the User:" },
  aml_2_li1: { ru: "В каждом объявлении отправителем и получателем платежа должно быть одно и то же лицо. Переводы в пользу третьих лиц категорически запрещены.", en: "In each listing the payer and the recipient must be the same person. Transfers to third parties are strictly prohibited." },
  aml_2_li2: { ru: "Все контактные данные, указанные Пользователем, а также иные персональные данные, передаваемые сервису FlowExchange, должны быть актуальными, точными и достоверными.", en: "All contact details provided by the User and other personal data transmitted to the FlowExchange service must be current, accurate and true." },
  aml_2_li3: { ru: "Создание объявлений с использованием анонимных прокси-серверов, VPN или иных анонимных подключений к сети Интернет категорически запрещено.", en: "Creating listings using anonymous proxy servers, VPN or other anonymous internet connections is strictly prohibited." },
  aml_3_h: { ru: "Политика AML сервиса FlowExchange", en: "FlowExchange AML policy" },
  aml_3_p1: { ru: "Настоящая политика противодействия легализации доходов, полученных преступным путём (далее — Политика AML), определяет правила, которых придерживается сервис FlowExchange:", en: "This Anti-Money Laundering Policy (hereinafter — AML Policy) sets out the rules followed by the FlowExchange service:" },
  aml_3_li1: { ru: "Не вступать в деловые отношения с лицами, заведомо связанными с преступной или террористической деятельностью.", en: "Not to enter into business relations with persons known to be linked to criminal or terrorist activity." },
  aml_3_li2: { ru: "Не обрабатывать операции, являющиеся результатом заведомо известной преступной или террористической деятельности.", en: "Not to process transactions that are the result of known criminal or terrorist activity." },
  aml_3_li3: { ru: "Не способствовать каким-либо сделкам, связанным с преступной или террористической деятельностью.", en: "Not to facilitate any transactions linked to criminal or terrorist activity." },
  aml_3_p2: { ru: "FlowExchange имеет право ограничить или полностью запретить использование сервиса для граждан отдельных государств, включая, но не ограничиваясь:", en: "FlowExchange has the right to restrict or fully prohibit use of the service for citizens of certain countries, including but not limited to:" },
  aml_3_p3: { ru: "Афганистан, Узбекистан, Босния и Герцеговина, США, Корейская Народно-Демократическая Республика, Таджикистан, Демократическая Республика Конго, Эритрея, Эфиопия, Гайана, Иран, Ирак, Лаосская Народно-Демократическая Республика, Ливия, Сомали, Южный Судан, Шри-Ланка, Судан, Сирия, Тринидад и Тобаго, Тунис, Уганда, Вануату, Украина.", en: "Afghanistan, Uzbekistan, Bosnia and Herzegovina, USA, North Korea, Tajikistan, Democratic Republic of the Congo, Eritrea, Ethiopia, Guyana, Iran, Iraq, Laos, Libya, Somalia, South Sudan, Sri Lanka, Sudan, Syria, Trinidad and Tobago, Tunisia, Uganda, Vanuatu, Ukraine." },
  aml_4_h: { ru: "Процедуры проверки (KYC)", en: "Verification procedures (KYC)" },
  aml_4_p1: { ru: "Сервис FlowExchange применяет собственные процедуры проверки в рамках политики KYC (Know Your Customer).", en: "The FlowExchange service applies its own verification procedures under the KYC (Know Your Customer) policy." },
  aml_4_p2: { ru: "FlowExchange вправе запросить прохождение процедуры верификации личности, включая предоставление документа, удостоверяющего личность (паспорт или идентификационная карта).", en: "FlowExchange may request identity verification, including provision of an identity document (passport or ID card)." },
  aml_4_p3: { ru: "Сервис FlowExchange оставляет за собой право собирать, обрабатывать и хранить идентификационную информацию Пользователей в целях реализации Политики AML. Обработка и хранение таких данных осуществляется в соответствии с Политикой конфиденциальности и правилами обработки персональных данных сервиса FlowExchange.", en: "The FlowExchange service reserves the right to collect, process and store User identification information for the implementation of the AML Policy. Such data is processed and stored in accordance with the Privacy Policy and personal data processing rules of the FlowExchange service." },
  aml_4_p4: { ru: "При необходимости сервис FlowExchange может запросить дополнительный документ для идентификации Пользователя, включая, но не ограничиваясь:", en: "If necessary, the FlowExchange service may request an additional document to identify the User, including but not limited to:" },
  aml_4_li1: { ru: "банковской выпиской;", en: "a bank statement;" },
  aml_4_li2: { ru: "счётом за коммунальные услуги не старше 3 месяцев, содержащим полное имя Пользователя и адрес проживания;", en: "a utility bill no older than 3 months containing the User's full name and address;" },
  aml_4_li3: { ru: "фото- или видео-верификацией Пользователя — при наличии подозрений в достоверности предоставленных данных.", en: "photo or video verification of the User — if there are doubts about the accuracy of the data provided." },
  aml_4_p5: { ru: "FlowExchange проверяет подлинность документов и информации, предоставляемых Пользователями, и оставляет за собой право запрашивать дополнительную информацию у Пользователей, признанных подозрительными или потенциально рискованными.", en: "FlowExchange verifies the authenticity of documents and information provided by Users and reserves the right to request additional information from Users deemed suspicious or potentially risky." },
  aml_4_p6: { ru: "В случае изменения идентификационных данных Пользователя либо выявления подозрительной активности FlowExchange вправе повторно запросить документы, даже если ранее они были успешно проверены.", en: "In the event of a change in the User's identification data or detection of suspicious activity, FlowExchange may request documents again, even if they were previously successfully verified." },
  aml_5_h: { ru: "Ответственный за соблюдение Политики AML", en: "AML compliance officer" },
  aml_5_p1: { ru: "Ответственным за соблюдение Политики AML является уполномоченный сотрудник FlowExchange, в обязанности которого входит:", en: "AML compliance is the responsibility of an authorised FlowExchange employee whose duties include:" },
  aml_5_li1: { ru: "сбор идентификационной информации Пользователей и передача её ответственному агенту по обработке персональных данных;", en: "collecting User identification information and passing it to the personal data processing officer;" },
  aml_5_li2: { ru: "разработка, внедрение и обновление внутренних политик и процедур;", en: "developing, implementing and updating internal policies and procedures;" },
  aml_5_li3: { ru: "подготовка, хранение и предоставление отчётности в соответствии с применимыми законами и правилами;", en: "preparing, storing and submitting reports in accordance with applicable laws and rules;" },
  aml_5_li4: { ru: "мониторинг транзакций и анализ отклонений от стандартного поведения Пользователей;", en: "monitoring transactions and analysing deviations from standard User behaviour;" },
  aml_5_li5: { ru: "ведение систем хранения и поиска документации;", en: "maintaining documentation storage and retrieval systems;" },
  aml_5_li6: { ru: "регулярная оценка и обновление уровней риска.", en: "regular assessment and updating of risk levels." },
  aml_5_p2: { ru: "Ответственный за соблюдение Политики AML вправе взаимодействовать с правоохранительными органами, осуществляющими борьбу с легализацией доходов, финансированием терроризма и иной незаконной деятельностью.", en: "The AML compliance officer may interact with law enforcement agencies combating money laundering, terrorism financing and other illegal activity." },
  aml_6_h: { ru: "Мониторинг транзакций", en: "Transaction monitoring" },
  aml_6_p1: { ru: "Мониторинг транзакций Пользователей является инструментом оценки риска и выявления подозрительных операций.", en: "Monitoring of User transactions is a tool for risk assessment and detection of suspicious operations." },
  aml_6_p2: { ru: "При наличии подозрений в легализации доходов или иной незаконной деятельности сервис FlowExchange оставляет за собой право:", en: "If money laundering or other illegal activity is suspected, the FlowExchange service reserves the right to:" },
  aml_6_li1: { ru: "уведомлять соответствующие правоохранительные органы о подозрительных операциях;", en: "notify the relevant law enforcement agencies of suspicious operations;" },
  aml_6_li2: { ru: "запрашивать у Пользователя дополнительные документы и информацию;", en: "request additional documents and information from the User;" },
  aml_6_li3: { ru: "приостанавливать или прекращать действие учётной записи Пользователя;", en: "suspend or terminate the User's account;" },
  aml_6_li4: { ru: "приостанавливать операции обмена и временно замораживать активы до выяснения обстоятельств;", en: "suspend exchange operations and temporarily freeze assets pending clarification;" },
  aml_6_li5: { ru: "отменять операцию и возвращать средства Пользователю в порядке, предусмотренном пользовательским соглашением;", en: "cancel the transaction and return funds to the User in accordance with the user agreement;" },
  aml_6_li6: { ru: "проводить дополнительную оценку уровня риска.", en: "conduct additional risk assessment." },
  aml_7_h: { ru: "Оценка рисков", en: "Risk assessment" },
  aml_7_p1: { ru: "В соответствии с международными стандартами FlowExchange применяет риск-ориентированный подход к предотвращению легализации доходов и финансированию терроризма.", en: "In accordance with international standards, FlowExchange applies a risk-based approach to preventing money laundering and terrorism financing." },
  aml_7_p2: { ru: "Меры контроля и проверки соразмерны уровню выявленных рисков.", en: "Control and verification measures are proportionate to the level of risk identified." },
  aml_date: { ru: "Дата последнего обновления: 12.01.2023", en: "Last updated: 12 January 2023" },
};

function applyLang() {
  const lang = getLang();
  setLang(lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const t = translations[key];
    if (t && t[lang]) el.textContent = t[lang];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const t = translations[key];
    if (t && t[lang]) el.placeholder = t[lang];
  });
  const btn = document.getElementById("langSwitch");
  if (btn) btn.textContent = lang === "ru" ? "RU" : "EN";
  if (typeof updateRateDisplay === "function") updateRateDisplay();
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const langSwitch = document.getElementById("langSwitch");

if (menuToggle && mobileMenu) {
  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("open")) return;
    if (mobileMenu.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMobileMenu();
  });

  window.addEventListener("scroll", () => {
    if (mobileMenu.classList.contains("open")) closeMobileMenu();
  });
}

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    const next = getLang() === "ru" ? "en" : "ru";
    setLang(next);
    applyLang();
  });
}

const REFRESH_TIMER_SEC = 60;

function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}

function startRefreshTimer() {
  const el = document.getElementById("refreshTimerValue");
  if (!el) return;
  let left = REFRESH_TIMER_SEC;
  el.textContent = formatTimer(left);
  const id = setInterval(() => {
    left -= 1;
    el.textContent = formatTimer(left);
    if (left <= 0) {
      clearInterval(id);
      location.reload();
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLang();
  updateRateDisplay();
  if (typeof initCurrencySwitchers === "function") initCurrencySwitchers();
  fetchRatesFromAPI();
  startRefreshTimer();
});

// Курсы для пары «отдаёте» → «получаете» (1 единица from = X to). Заполняются из API или демо.
const RATES = {
  cash_rub: { usdt_trc20: 0.00915, btc: 0.000000092 },
  usdt_trc20: { cash_rub: 108.5, btc: 0.00001035 },
  btc: { cash_rub: 10480000, usdt_trc20: 96800 },
};

/** Спред: итоговый множитель на покупку и продажу USDT. */
const USDT_BUY_SPREAD = 1.01411389;   // курс на покупку USDT
const USDT_SELL_SPREAD = 1.00412538;  // курс на продажу USDT

function applyRatesFromRub(usdtRub, btcRub) {
  if (typeof usdtRub !== "number" || typeof btcRub !== "number" || usdtRub <= 0 || btcRub <= 0) return;
  const usdtRubBuy = usdtRub * USDT_BUY_SPREAD;   // руб за 1 USDT при покупке USDT клиентом
  const usdtRubSell = usdtRub * USDT_SELL_SPREAD; // руб за 1 USDT при продаже USDT клиентом
  RATES.cash_rub.usdt_trc20 = 1 / usdtRubBuy;
  RATES.cash_rub.btc = 1 / btcRub;
  RATES.usdt_trc20.cash_rub = usdtRubSell;
  RATES.usdt_trc20.btc = usdtRubSell / btcRub;
  RATES.btc.cash_rub = btcRub;
  RATES.btc.usdt_trc20 = btcRub / usdtRubBuy;
  if (typeof updateRateDisplay === "function") updateRateDisplay();
  if (typeof updateToAmountFromRate === "function") updateToAmountFromRate();
}

/** Загрузка курсов с CoinGecko: USDT/RUB и BTC/RUB. Ответ: { tether: { rub }, bitcoin: { rub } }. */
async function fetchRatesFromAPI() {
  try {
    const res = await fetch(COINGECKO_PRICE_URL);
    if (!res.ok) return;
    const data = await res.json();
    const usdtRub = parseFloat(data?.tether?.rub);
    const btcRub = parseFloat(data?.bitcoin?.rub);
    if (Number.isFinite(usdtRub) && Number.isFinite(btcRub) && usdtRub > 0 && btcRub > 0)
      applyRatesFromRub(usdtRub, btcRub);
  } catch (_) {}
}

const CURRENCY_LABELS = {
  cash_rub: "Наличные RUB",
  usdt_trc20: "USDT TRC20",
  btc: "BTC",
};

const CURRENCY_SHORT_LABELS = {
  cash_rub: "НАЛ",
  usdt_trc20: "USDT",
  btc: "BTC",
};

/** При выборе валюты на одной стороне — на другой подставляется пара: НАЛ↔USDT, НАЛ↔BTC, BTC↔НАЛ */
const CURRENCY_PAIR_PARTNER = {
  cash_rub: "btc",
  usdt_trc20: "cash_rub",
  btc: "cash_rub",
};

function updateCurrencySelectedLabels() {
  const fromInput = document.getElementById("fromCurrency");
  const toInput = document.getElementById("toCurrency");
  const fromLabelEl = document.getElementById("fromCurrencyLabel");
  const toLabelEl = document.getElementById("toCurrencyLabel");
  if (!fromInput || !toInput || !fromLabelEl || !toLabelEl) return;
  fromLabelEl.textContent = CURRENCY_SHORT_LABELS[fromInput.value] || fromInput.value;
  toLabelEl.textContent = CURRENCY_SHORT_LABELS[toInput.value] || toInput.value;
}

function updateRateDisplay() {
  const fromInput = document.getElementById("fromCurrency");
  const toInput = document.getElementById("toCurrency");
  const valueEl = document.getElementById("rateDisplayValue");
  if (!fromInput || !toInput || !valueEl) return;

  const fromVal = fromInput.value;
  const toVal = toInput.value;
  const lang = getLang();
  const labelKey = (v) => (v === "cash_rub" ? "optionCashRub" : v === "usdt_trc20" ? "optionUsdt" : "optionBtc");
  const fromLabel = (translations[labelKey(fromVal)] && translations[labelKey(fromVal)][lang]) || CURRENCY_LABELS[fromVal] || fromVal;
  const toLabel = (translations[labelKey(toVal)] && translations[labelKey(toVal)][lang]) || CURRENCY_LABELS[toVal] || toVal;

  if (fromVal === toVal) {
    valueEl.textContent = "—";
    return;
  }

  const rate = RATES[fromVal] && RATES[fromVal][toVal];
  if (rate == null) {
    valueEl.textContent = "—";
    return;
  }

  const formatted = rate >= 1 ? rate.toLocaleString("ru-RU", { maximumFractionDigits: 2 }) : rate.toFixed(6);
  valueEl.textContent = `1 ${fromLabel} = ${formatted} ${toLabel}`;
}

function setCurrencyFromSwitcher(switcherId, hiddenInputId, value) {
  const wrap = document.getElementById(switcherId);
  const hidden = document.getElementById(hiddenInputId);
  if (!wrap || !hidden) return;
  wrap.querySelectorAll(".currency-option").forEach((btn) => {
    const isActive = btn.getAttribute("data-currency") === value;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });
  hidden.value = value;
  updateRateDisplay();
  updateCurrencySelectedLabels();
  if (typeof updateToAmountFromRate === "function") updateToAmountFromRate();
}

function initCurrencySwitchers() {
  const fromWrap = document.getElementById("fromCurrencySwitcher");
  const toWrap = document.getElementById("toCurrencySwitcher");
  const fromHidden = document.getElementById("fromCurrency");
  const toHidden = document.getElementById("toCurrency");

  fromWrap?.querySelectorAll(".currency-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-currency");
      const partner = CURRENCY_PAIR_PARTNER[value];
      setCurrencyFromSwitcher("fromCurrencySwitcher", "fromCurrency", value);
      if (partner) setCurrencyFromSwitcher("toCurrencySwitcher", "toCurrency", partner);
    });
  });
  toWrap?.querySelectorAll(".currency-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-currency");
      const partner = CURRENCY_PAIR_PARTNER[value];
      setCurrencyFromSwitcher("toCurrencySwitcher", "toCurrency", value);
      if (partner) setCurrencyFromSwitcher("fromCurrencySwitcher", "fromCurrency", partner);
    });
  });

  setCurrencyFromSwitcher("fromCurrencySwitcher", "fromCurrency", fromHidden?.value ?? "cash_rub");
  setCurrencyFromSwitcher("toCurrencySwitcher", "toCurrency", toHidden?.value ?? "usdt_trc20");
  updateCurrencySelectedLabels();
}

const swapBtn = document.getElementById("swapBtn");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

if (swapBtn && fromCurrency && toCurrency) {
  swapBtn.addEventListener("click", () => {
    const fromVal = fromCurrency.value;
    const toVal = toCurrency.value;
    fromCurrency.value = toVal;
    toCurrency.value = fromVal;
    setCurrencyFromSwitcher("fromCurrencySwitcher", "fromCurrency", toVal);
    setCurrencyFromSwitcher("toCurrencySwitcher", "toCurrency", fromVal);
    updateCurrencySelectedLabels();
    const fromAmount = document.getElementById("fromAmount");
    const toAmount = document.getElementById("toAmount");
    if (fromAmount && toAmount) {
      const t = fromAmount.value;
      fromAmount.value = toAmount.value;
      toAmount.value = t;
    }
    updateRateDisplay();
  });
}

const fromAmountEl = document.getElementById("fromAmount");
if (fromAmountEl) {
  fromAmountEl.addEventListener("input", () => {
    let v = fromAmountEl.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const parts = v.split(".");
    if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
    if (v !== fromAmountEl.value) fromAmountEl.value = v;
    updateToAmountFromRate();
  });
}

function updateToAmountFromRate() {
  const fromAmountEl = document.getElementById("fromAmount");
  const toAmountEl = document.getElementById("toAmount");
  const fromVal = fromCurrency?.value;
  const toVal = toCurrency?.value;
  if (!fromAmountEl || !toAmountEl || !fromVal || !toVal || fromVal === toVal) return;
  const rate = RATES[fromVal] && RATES[fromVal][toVal];
  if (rate == null) {
    toAmountEl.value = "";
    return;
  }
  const raw = fromAmountEl.value.replace(",", ".").trim();
  const num = parseFloat(raw);
  if (raw === "" || Number.isNaN(num) || num < 0) {
    toAmountEl.value = "";
    return;
  }
  const result = num * rate;
  const isBtc = toVal === "btc";
  toAmountEl.value = isBtc
    ? (result < 0.0001 ? result.toExponential(4) : result.toFixed(8).replace(/\.?0+$/, ""))
    : result.toLocaleString("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function updateFromAmountFromRate() {
  const fromAmountEl = document.getElementById("fromAmount");
  const toAmountEl = document.getElementById("toAmount");
  const fromVal = fromCurrency?.value;
  const toVal = toCurrency?.value;
  if (!fromAmountEl || !toAmountEl || !fromVal || !toVal || fromVal === toVal) return;
  const rate = RATES[fromVal] && RATES[fromVal][toVal];
  if (rate == null || rate === 0) {
    fromAmountEl.value = "";
    return;
  }
  const raw = toAmountEl.value.replace(/,/g, ".").replace(/\s/g, "").trim();
  const num = parseFloat(raw);
  if (raw === "" || Number.isNaN(num) || num < 0) {
    fromAmountEl.value = "";
    return;
  }
  const result = num / rate;
  const isBtc = fromVal === "btc";
  fromAmountEl.value = isBtc
    ? (result < 0.0001 ? result.toExponential(4) : result.toFixed(8).replace(/\.?0+$/, ""))
    : result.toLocaleString("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

if (fromCurrency) {
  fromCurrency.addEventListener("change", () => {
    updateRateDisplay();
    updateToAmountFromRate();
  });
}
if (toCurrency) {
  toCurrency.addEventListener("change", () => {
    updateRateDisplay();
    updateToAmountFromRate();
  });
}

const toAmountEl = document.getElementById("toAmount");
if (toAmountEl) {
  toAmountEl.addEventListener("input", () => {
    let v = toAmountEl.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const parts = v.split(".");
    if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
    if (v !== toAmountEl.value) toAmountEl.value = v;
    updateFromAmountFromRate();
  });
}

const exchangeForm = document.getElementById("exchangeForm");
const agreement = document.getElementById("agreement");
const contactValue = document.getElementById("contactValue");
const formNote = document.getElementById("formNote");
const submitExchangeBtn = document.getElementById("submitExchangeBtn");

function clearFormErrorIfValid() {
  if (!formNote || !agreement || !contactValue) return;
  if (agreement.checked && contactValue.value.trim().length > 0 && formNote.classList.contains("error")) {
    formNote.textContent = "";
    formNote.classList.remove("error");
  }
}

if (agreement) agreement.addEventListener("change", clearFormErrorIfValid);
if (contactValue) {
  contactValue.addEventListener("input", clearFormErrorIfValid);
  contactValue.addEventListener("input", () => {
    const start = contactValue.selectionStart;
    const before = contactValue.value;
    const after = before.replace(/[\u0400-\u04FF]/g, "");
    if (before !== after) {
      contactValue.value = after;
      const pos = Math.min(start, after.length);
      contactValue.setSelectionRange(pos, pos);
    }
  });
}

if (exchangeForm && agreement && contactValue && formNote) {
  exchangeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lang = getLang();
    formNote.className = "form-note error";
    const noContact = !contactValue.value.trim();
    const noAgreement = !agreement.checked;

    if (noAgreement && noContact) {
      formNote.textContent = translations.formErrorBoth[lang];
      return;
    }
    if (noAgreement) {
      formNote.textContent = translations.formErrorAgreement[lang];
      return;
    }
    if (noContact) {
      formNote.textContent = translations.formErrorContact[lang];
      return;
    }

    const fromCurrencyEl = document.getElementById("fromCurrency");
    const toCurrencyEl = document.getElementById("toCurrency");
    const fromAmountEl = document.getElementById("fromAmount");
    const toAmountEl = document.getElementById("toAmount");
    const contactTypeEl = document.getElementById("contactType");
    const payload = {
      date: new Date().toISOString(),
      fromCurrency: fromCurrencyEl?.value ?? "",
      toCurrency: toCurrencyEl?.value ?? "",
      fromAmount: fromAmountEl?.value?.trim() ?? "",
      toAmount: toAmountEl?.value?.trim() ?? "",
      contactType: contactTypeEl?.value ?? "telegram",
      contact: contactValue.value.trim(),
    };

    if (GOOGLE_SHEETS_WEB_APP_URL) {
      const iframe = document.querySelector('iframe[name="sheetSubmitFrame"]');
      if (iframe) {
        const q = new URLSearchParams({
          date: payload.date,
          fromCurrency: payload.fromCurrency,
          toCurrency: payload.toCurrency,
          fromAmount: payload.fromAmount,
          toAmount: payload.toAmount,
          contactType: payload.contactType,
          contact: payload.contact,
        });
        iframe.src = GOOGLE_SHEETS_WEB_APP_URL + "?" + q.toString();
      }
    }

    formNote.className = "form-note";
    formNote.textContent = translations.formSuccess[lang];
    formNote.classList.add("ok");
    exchangeForm.reset();
  });
}
