// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'keyword-spacing':0,
    'no-unused-vars':0,
    'no-console':0,
    'no-undef':0,
    'eqeqeq':0,
    'eol-last':0,
    'quotes':0,
    'key-spacing': 0,
    'brace-style': 0,
    'semi': 0,
    'no-multi-spaces': 0,
    'object-property-newline': 0,
    'space-before-blocks': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 'off',
    'comma-dangle': 0,
    'indent': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
