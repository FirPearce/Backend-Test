module.exports = {
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  env: {
    node: true,
    mongo: true
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off"
  }
};
