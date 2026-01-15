module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push('react-native-worklets/plugin');
  plugins.push(["inline-import", { "extensions": [".sql"] }]);
  plugins.push([
    "module-resolver",
    {
      root: ["."],
      alias: {
        "@": "./src",
        "@ui": "./src/ui",
        "@core": "./src/core",
        "@domain": "./src/domain",
        "@infra": "./src/infrastructure",
        "@app": "./src/application",
        "@state": "./src/state",
        "@/drizzle": "./drizzle",
        "@/assets": "./assets",
      },
    },
  ]);

  return {
    presets: [
      [
        'babel-preset-expo', 
        {
          unstable_transformImportMeta: true,
          jsxImportSource: 'nativewind' 
        },
      ], 
      'nativewind/babel'
    ],

    plugins,
  };
};
