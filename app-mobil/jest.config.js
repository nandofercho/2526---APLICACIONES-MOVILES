const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "tsx", "js"],

  // 🔥 AGREGA ESTO
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
};