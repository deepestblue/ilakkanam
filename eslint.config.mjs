import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import qunit from "eslint-plugin-qunit";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                QUnit: "readonly",
            },
            parserOptions: {
                ecmaFeatures: {
                    impliedStrict: true,
                },
            },
        },
        plugins: {
            qunit,
        },
    },
    js.configs.all,
    {
        rules: {
            "consistent-return": "off",
            "func-names": "off",
            "id-length": "off",
            "max-statements": "off",
            "no-alert": "off",
            "no-duplicate-imports": "off",
            "no-inline-comments": "off",
            "no-magic-numbers": ["error", { ignore: [0, 1, 2,], },],
            "no-multi-assign": ["error", { ignoreNonDeclaration: true, },],
            "no-shadow": ["error", { builtinGlobals: true, },],
            "no-ternary": "off",
            "one-var": "off",
            "require-unicode-regexp": ["error", { requireFlag: "v", },],
            "sort-imports": "off",
            ...qunit.configs.recommended.rules,
        },
    },
    {
        files: ["*/test.js",],
        rules: {
            "max-lines": "off",
            "max-lines-per-function": "off",
        },
    },
    {
        files: ["*/vinayData.js",],
        rules: {
            "max-lines": "off",
        },
    },
    stylistic.configs.customize({
        braceStyle: "1tbs",
        commaDangle: "always",
        indent: 4,
        jsx: false,
        quotes: "double",
        semi: true,
    },),
    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "@stylistic/max-statements-per-line": "off",
            "@stylistic/space-unary-ops": ["error", { overrides: { "!": true, }, },],
        },
    },
];
