const path = require('path');

module.exports = {
  title: 'Openshop Docs',
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Configuration',
      content: 'docs/configuration.md',
    },
    {
      name: 'Live Demo',
      external: true,
      href: 'https://openshop.netlify.app',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Cart',
          content: 'docs/components/cart.md',
          components: 'components/cart/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Filters',
          content: 'docs/components/filters.md',
          components: 'components/filters/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Payment',
          content: 'docs/components/payment.md',
          components: 'components/payment/**/[A-Z]*.js',
          exampleMode: 'expand',
          usageMode: 'expand',
        },
        {
          name: 'Shared',
          content: 'docs/components/shared.md',
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
