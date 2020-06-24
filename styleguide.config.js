const path = require('path');

module.exports = {
  title: 'Openshop Docs',
  sections: [
    {
      name: '',
      content: 'README.md',
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
          name: 'Payment',
          content: 'components/payment/payment.md',
          components: 'components/payment/**/[A-Z]*.js',
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
    favicon: '/favicon.ico',
  },
  theme: {
    font: ['Helvetica', 'sans-serif'],
    baseBackground: '#171923',
    color: {
      baseBackground: '#171923',
      link: '#E9D8FD',
      linkHover: '#B794F4',
      border: '#EDF2F7',
      base: '#F7FAFC',
      codeBase: '#eee',
      codeComment: '#9ab',
      codeDeleted: '#B2F5EA',
      codeFunction: '#fe6',
      codeInserted: '#690',
      codeKeyword: '#FC8181',
      codeOperator: '#d7f',
      codeProperty: '#B2F5EA',
      codePunctuation: '#ccc',
      codeString: '#68D391',
      codeVariable: '#e90',
      codeBackground: '#171923',
    },
  },
  styles: function styles(theme) {
    return {
      Playground: {
        preview: {
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: [[0, 0, 1, 0]],
          borderRadius: 0,
        },
      },
      Code: {
        code: {
          color: theme.color.link,
          fontSize: 14,
        },
      },
    };
  },
  assetsDir: 'public/',
  moduleAliases: {
    '@app/redux': path.resolve(__dirname, 'lib/redux/'),
    '@app/lambda': path.resolve(__dirname, 'lib/lambda/'),
    '@app/components': path.resolve(__dirname, 'components/'),
    '@app/styles': path.resolve(__dirname, 'styles/'),
    '@app/pages': path.resolve(__dirname, 'pages/'),
    '@app': path.resolve(__dirname, './'),
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/styleguidist/StyleWrapper'),
    StyleGuideRenderer: path.join(__dirname, 'lib/styleguidist/StyleGuide'),
    SectionsRenderer: path.join(__dirname, 'lib/styleguidist/SectionsRenderer'),
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
