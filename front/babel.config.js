module.exports = {
  presets: [
    '@vue/app',
    // 加入ie相关的polyfill
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ]
}
