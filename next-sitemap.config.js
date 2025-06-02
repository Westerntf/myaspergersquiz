module.exports = {
  siteUrl: 'https://myaspergersquiz.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true, // If you have multiple sitemaps
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude internal, dev, or non-public pages
  exclude: [
    '/admin*',
    '/dashboard*',
    '/api/*',
    '/secret-page',
    '/test',
    '/dev/*',
    '/drafts/*',
    '/404',
    '/500',
    '/maintenance',
  ],

  // Internationalization (add/modify for more locales)
  alternateRefs: [
    { href: 'https://myaspergersquiz.com', hreflang: 'en' },
    // { href: 'https://myaspergersquiz.com/es', hreflang: 'es' }, // Example: Spanish
    // { href: 'https://myaspergersquiz.com/fr', hreflang: 'fr' }, // Example: French
    // { href: 'https://myaspergersquiz.com/en-au', hreflang: 'en-au' }, // Example: Australian English
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/dashboard', '/api', '/secret-page', '/dev', '/drafts', '/404', '/500', '/maintenance'] },
      // Add specific bot exclusions if needed:
      // { userAgent: 'AhrefsBot', disallow: '/' },
    ],
    additionalSitemaps: [
      'https://myaspergersquiz.com/sitemap.xml',
      // 'https://myaspergersquiz.com/sitemap-news.xml', // Uncomment if using news
      // 'https://myaspergersquiz.com/sitemap-images.xml', // Uncomment if using image sitemap
    ],
  },

  // Experimental: News & image sitemap generation (uncomment/configure if needed)
  // transform: async (config, path) => {
  //   // Example: only include latest content in news sitemap
  //   if (path.startsWith('/news')) {
  //     return {
  //       loc: path,
  //       lastmod: new Date().toISOString(),
  //       priority: 1.0,
  //       changefreq: 'daily',
  //       news: {
  //         publication: {
  //           name: 'My Aspergers Quiz',
  //           language: 'en',
  //         },
  //         publication_date: new Date().toISOString(),
  //         title: 'Latest Updates',
  //       },
  //     };
  //   }
  //   return config;
  // },

  // Canonical URLs: Add <link rel="canonical"> as needed (handled in pages but this ensures every route is considered canonical by default)
  autoLastmod: true, // Update lastmod in sitemap automatically

  // PWA & theme polish (add to your <Head> for extra points, not here):
  // <meta name="theme-color" content="#ffffff">
  // <link rel="manifest" href="/manifest.json">

  // Social preview tips (handled in pages, but be sure og:image, og:description, etc, match what’s discoverable in sitemap)
};