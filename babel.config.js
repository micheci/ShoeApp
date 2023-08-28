module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo","module:metro-react-native-babel-preset", "module:react-native-dotenv"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
    ],
  };
};
