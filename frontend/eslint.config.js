// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = tseslint.config(
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            eslintConfigPrettier, // ersetzt "eslint-config-prettier"
        ],
        plugins: {
            prettier, // aktiviert eslint-plugin-prettier
        },
        processor: angular.processInlineTemplates,
        rules: {
            "prettier/prettier": "error", // Prettier-Fehler als ESLint-Fehler
            "@angular-eslint/directive-selector": [
                "error",
                { type: "attribute", prefix: "app", style: "camelCase" },
            ],
            "@angular-eslint/component-selector": [
                "error",
                { type: "element", prefix: "app", style: "kebab-case" },
            ],
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@angular-eslint/prefer-inject": "off",
            "@typescript-eslint/consistent-indexed-object-style": "off",
        },
    },
    {
        files: ["**/*.html"],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
        rules: {},
    },
);
