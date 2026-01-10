/* eslint-env node */
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

const importPlugin = require("eslint-plugin-import");

module.exports = defineConfig([
  expoConfig,

  {
    ignores: ["dist/*"],
  },

  {
    plugins: {
      import: importPlugin,
    },
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
    },
  },

  {
    rules: {
      "react/display-name": "off",
    },
  },
]);
