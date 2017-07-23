module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true
  },

  extends: ["prettier"],

  // required to lint *.vue files
  plugins: ["html", "prettier"],

  // add your custom rules here
  rules: {
    "prettier/prettier": "error"
  }
};
