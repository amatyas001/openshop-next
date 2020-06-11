module.exports = {
  rootDir: './',
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.test.js'],
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
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
