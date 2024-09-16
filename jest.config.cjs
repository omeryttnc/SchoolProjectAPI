/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.js"],
  verbose: true,
  forceExit: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^mysql2$": "<rootDir>/__mocks__/mysql2.js",
  },
  // clearMocks: true // Uncomment if you want to automatically clear mocks between tests
};
