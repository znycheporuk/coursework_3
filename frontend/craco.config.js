const CracoLessPlugin = require('craco-less');

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#7d7d0f',
              '@layout-header-background': '@primary-color'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};