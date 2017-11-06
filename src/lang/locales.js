import i18n from 'i18n';

export default function initLocale() {
  i18n.configure({
    cookie: 'lang',
    defaultLocale: 'en',
    directory: `${__dirname}/locales`,
    locales: ['en', 'ru'],
    register: global,
  });
}
