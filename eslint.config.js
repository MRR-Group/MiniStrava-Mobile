/* eslint-env node */
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/*"],
  },

  {
    plugins: { "react-native": reactNativePlugin },
    rules: {
      "react-native/no-raw-text": "error",
    },
  },

  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import/no-unresolved": "error",
      "react/display-name": "off",
    },
  },
]);
