module.exports = (api) => {
  const targets = {}
  if (api.env('test')) {
    targets.node = 'current'
  }

  return {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        targets
      }]
    ],
    plugins: [
      '@babel/plugin-transform-object-assign',
    ]
  }
}
