module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.cjs'],
    transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
    moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy' },
  };
  