const path = require('path');

module.exports = {
  title: 'Openshop Docs',
  sections: [
    {
      name: '',
      content: 'README.md',
    },
    {
      name: 'Live Demo',
      external: true,
      href: 'https://openshop.netlify.app',
    },
    {
      name: 'Test Coverage',
      href: '/coverage/lcov-report/index.html',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Cart',
          content: 'components/cart/cart.md',
          components: 'components/cart/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Filters',
          content: 'components/filters/filters.md',
          components: 'components/filters/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Payment',
          content: 'components/payment/payment.md',
          components: 'components/payment/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Shared',
          content: 'components/shared/shared.md',
          components: 'components/shared/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
      ],
    },
  ],
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Helvetica', 'sans-serif'],
  },
  moduleAliases: {
    '@app/redux': path.resolve(__dirname, 'lib/redux/'),
    '@app/lambda': path.resolve(__dirname, 'lib/lambda/'),
    '@app/components': path.resolve(__dirname, 'components/'),
    '@app/styles': path.resolve(__dirname, 'styles/'),
    '@app/pages': path.resolve(__dirname, 'pages/'),
    '@app': path.resolve(__dirname, './'),
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/styleguidist/styleguide.wrapper.js'),
  },
  webpackConfig: {
    output: path.join(__dirname, 'docs'),
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
