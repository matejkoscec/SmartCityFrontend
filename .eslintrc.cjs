module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", "tailwind.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-misused-promises": 0,
    "import/no-unresolved": 0,
    "import/order": [
      "warn",
      {
        "alphabetize": { "order": "asc" },
        "newlines-between": "always",
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "groups": ["builtin", "external", "internal", ["parent", "sibling"], "index"],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
