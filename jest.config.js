/**
 * Root Jest config for monorepo
 */
module.exports = {
  projects: [
    '<rootDir>/packages/components',
    '<rootDir>/packages/utils',
    '<rootDir>/apps/pokedox',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/?(*.)+(test).[jt]s?(x)'
  ],
  moduleNameMapper: {
    '^@pokedox/components(.*)$': '<rootDir>/packages/components$1',
    '^@pokedox/utils(.*)$': '<rootDir>/packages/utils$1',
  },
};
