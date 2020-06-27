const path = require('path');

module.exports = {
  title: 'Openshop Docs',
  sections: [
    {
      name: '',
      content: 'README.md',
    },
    {
      name: 'Payment Process',
      content: 'components/payment/payment.md',
      components: 'components/payment/**/[A-Z]*.js',
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
    {
      name: 'Components',
      content: 'components/components.md',
      sections: [
        {
          name: 'Cart',
          content: 'components/cart/cart.md',
          components: 'components/cart/**/[A-Z]*.js',
          exampleMode: 'collapse',
          usageMode: 'expand',
        },
        {
          name: 'Filters',
          content: 'components/filters/filters.md',
          components: 'components/filters/**/[A-Z]*.js',
          exampleMode: 'collapse',
          usageMode: 'expand',
        },
        {
          name: 'Shared',
          content: 'components/shared/shared.md',
          components: 'components/shared/**/[A-Z]*.js',
          exampleMode: 'collapse',
          usageMode: 'expand',
        },
      ],
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
  //require: [path.resolve(__dirname, 'lib/styleguide/setup.js')],
  moduleAliases: {
    '@app/redux': path.resolve(__dirname, 'lib/redux/'),
    '@app/lambda': path.resolve(__dirname, 'lib/lambda/'),
    '@app/components': path.resolve(__dirname, 'components/'),
    '@app/styles': path.resolve(__dirname, 'styles/'),
    '@app/pages': path.resolve(__dirname, 'pages/'),
    '@app': path.resolve(__dirname, './'),
  },
  styleguideComponents: {
    Wrapper: path.resolve(__dirname, 'lib/styleguide/components/StyleWrapper'),
    StyleGuideRenderer: path.resolve(
      __dirname,
      'lib/styleguide/components/StyleGuideRenderer'
    ),
  },
  configureServer(app) {
    app.use(express.static('openshop-next'));
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
