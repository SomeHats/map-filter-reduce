module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  assetPrefix: process.env.NODE_ENV === 'production' ? '/out' : '',
};
