module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'comma-dangle': [0],
    'eqeqeq': [0],
    'camelcase': [0],
    'semi': 0,
    "quotes": [0, "double"],
    "space-before-function-paren": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    '$': true,
    'sysConfig': true,
    'vuexStore': true,
    'callNumberList': true,
    'rImchat': true,
  }
}
