const description =
  'Launch your own fully automated store with Snipcart, Printful, and Next.js';
const title = 'PLATONISK';

const seo = {
  title,
  titleTemplate: '%s | PLATONISK',
  description,
  themeColor: '#b0deb7',
  language: 'da',
  openGraph: {
    title,
    description,
    locale: 'da_DK',
    type: 'website',
    site_name: title,
    images: [
      {
        url: 'https://platonisk.com/graphics/splash.webp',
        width: 1200,
        height: 630,
        alt: 'Platonisk',
        type: 'image/webp',
      },
    ],
    additionalMetaTags: [
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: '#b0deb7' },
    ],
  },
};

export { seo as defaultSEO };
