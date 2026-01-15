module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push('react-native-worklets/plugin');
  plugins.push(["inline-import", { "extensions": [".sql"] }]);

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
