module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // plugins: [['module:react-native-dotenv']],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          // '@/components':'./src/components'
        },
      },
    ],
  ],

};
