/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh'],
    defaultLanguage: 'en',
    fallbackLng: ['en'],
  },
  react: { useSuspense: false },
  reactStrictMode: false,
}

module.exports = nextConfig
