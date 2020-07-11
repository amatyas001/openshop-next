const path = require('path');

module.exports = {
  title: 'Openshop Docs',
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Introduction',
      content: 'lib/styleguide/docs/introduction.md',
    },
    {
      name: 'Configuration',
      content: 'lib/styleguide/docs/configuration.md',
    },
    {
      name: 'State Management',
      content: 'lib/styleguide/docs/state_management.md',
    },
    {
      name: 'Products and Cart',
      content: 'lib/styleguide/docs/products_and_cart.md',
      components: [
        'components/product/ProductCard/ProductCard.js',
        'components/filter/FilterPanel/FilterPanel.js',
        'components/cart/CartPanel/CartPanel.js',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Payment Process',
      content: 'lib/styleguide/docs/payment_process.md',
      components: 'components/payment/**/[A-Z]*.js',
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Utility Components',
      content: 'lib/styleguide/docs/utility_components.md',
      components: 'components/shared/**/[A-Z]*.js',
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
  ],
  template: {
    favicon: 'favicon.ico',
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'fonts/Montserrat-Regular.ttf',
        },
        {
          rel: 'stylesheet',
          href: 'fonts/Khand-Bold.ttf',
        },
      ],
    },
  },
  theme: path.resolve(__dirname, 'lib/styleguide/theme.js'),
  styles: path.resolve(__dirname, 'lib/styleguide/styles.js'),
  assetsDir: path.resolve(__dirname, 'public/'),
  require: [path.resolve(__dirname, 'lib/styleguide/setup.js')],
  moduleAliases: {
    '@app/mocks': path.resolve(__dirname, '__mocks__/@app/mocks/'),
    '@app': path.resolve(__dirname, './'),
  },
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, 'lib/styleguide/components/StyleWrapper'),
    StyleGuideRenderer: path.resolve(
      __dirname,
      'lib/styleguide/components/StyleGuideRenderer'
    ),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
};
