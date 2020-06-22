module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.test.js'],
  coverageDirectory: 'docs/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/styles/',
    '/cypress/',
    '/lambda-build/',
    '/out/',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/files.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styles.js',
    '^@app/components(.*)$': '<rootDir>/components$1',
    '^@app/redux(.*)$': '<rootDir>/lib/redux$1',
    '^@app/lambda(.*)$': '<rootDir>/lib/lambda$1',
    '^@app/styles(.*)$': '<rootDir>/styles$1',
    '^@app/pages(.*)$': '<rootDir>/pages$1',
    '^@app(.*)$': '<rootDir>$1',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
