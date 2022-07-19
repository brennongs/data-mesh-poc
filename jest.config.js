module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
    },
  },

  /**
   * These should be modified collect coverage on critical modules as well
   * as ignoring files that's don't need test coverage.
   */
  collectCoverageFrom: [
    'src/main/**/*.ts',
    'src/repositories/**/*.ts',
    'src/usecases/**/*.ts',
    'src/utils/**/*.ts',
  ],

  /**
   * There are some files that don't need test coverage. You can exclude them with
   * negative regex in `collectCoverageFrom` or with regex here.
   */
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    // these are generally just re-exporting sub modules and shouldn't be covered
    '/src/.+/index.ts',
    // these are just re-exporting types definitions and shouldn't be covered
    '/src/.+/protocols.ts',
    '/src/types/',
    '/src/main/server.ts',
    '/src/utils/settings.ts',
    '/src/utils/logger.ts',
    '.*\\.d\\.ts',
  ],

  moduleFileExtensions: ['ts', 'js'],

  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },

  /**
   * - spec = specification and should be co-located unit tests
   * - test = should be integration/e2e tests located under /tests
   */
  testMatch: ['**/*.(test|spec).ts'],

  testEnvironment: 'node',

  /**
   * These will have to match any changes to `paths` in the tsconfig.json
   */
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/$1',
    '$/(.*)': '<rootDir>/src/$1'
  },
};