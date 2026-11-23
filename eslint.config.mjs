import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import qunit from "eslint-plugin-qunit";
import css from "@eslint/css";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import html from "@html-eslint/eslint-plugin";
import yml from "eslint-plugin-yml";
import { defineConfig, globalIgnores, includeIgnoreFile, } from "eslint/config";

// Keep each entry as narrow as the code points actually needed: an entry wider than that causes no lint error, so the extra characters it allows would go unnoticed.
const allowedCodePoints = {
    whitespace: String.raw`\u{000A}\u{0020}`,
    tamil: String.raw`\u{0B83}\u{0B85}-\u{0B8A}\u{0B8E}-\u{0B90}\u{0B92}-\u{0B93}\u{0B95}\u{0B99}-\u{0B9A}\u{0B9E}-\u{0B9F}\u{0BA3}-\u{0BA4}\u{0BA8}-\u{0BAA}\u{0BAE}-\u{0BB5}\u{0BBE}-\u{0BC2}\u{0BC6}-\u{0BC8}\u{0BCA}-\u{0BCB}\u{0BCD}`,
    malayalam: String.raw`\u{0D02}\u{0D2E}-\u{0D2F}\u{0D32}-\u{0D33}\u{0D3E}`,
    kannada: String.raw`\u{0C95}\u{0CA1}\u{0CA8}\u{0CCD}`,
    telugu: String.raw`\u{0C17}\u{0C24}\u{0C32}\u{0C41}\u{0C46}`,
    latin: String.raw`\u{0021}-\u{0026}\u{0028}-\u{007E}\u{00D7}\u{02BC}\u{0304}\u{0323}\u{2010}\u{2014}\u{201C}-\u{201D}\u{2026}\u{221A}`,
    arrows: String.raw`\u{2192}`,
};

const disallowedCodePoint = new RegExp(`[^${Object.values(allowedCodePoints,).join("",)}]`, "gv",);

const allowListRule = {
    meta: {
        type: "problem",
        messages: {
            BOM: "A byte‐order mark is not in the allow‐list.",
            disallowed: "{{codePoint}} is not in the allow‐list.",
        },
    },
    // The whole text is scanned during create and no visitors are needed, to avoid a situation where the visitors could get called multiple times.
    create: context => {
        const { sourceCode, } = context;
        if (sourceCode.hasBOM) {
            context.report({ loc: sourceCode.getLocFromIndex(0,), messageId: "BOM", },);
        }
        sourceCode.text.matchAll(disallowedCodePoint,)
            .map(({ 0: char, index, },) => ({
                loc: {
                    start: sourceCode.getLocFromIndex(index,),
                    end: sourceCode.getLocFromIndex(index + char.length,),
                },
                messageId: "disallowed",
                data: { codePoint: `U+${char.codePointAt(0,).toString(16,).toUpperCase().padStart(4, "0",)}`, },
            }),)
            .forEach(descriptor => context.report(descriptor,),);
        return {};
    },
};

export default defineConfig([
    includeIgnoreFile(`${import.meta.dirname}/.gitignore`,),
    globalIgnores(["package-lock.json",],),
    {
        files: ["**/*.js", "**/*.mjs",],
        extends: [
            js.configs.all,
            stylistic.configs.customize({
                braceStyle: "1tbs",
                commaDangle: "always",
                indent: 4,
                jsx: false,
                quotes: "double",
                semi: true,
            },),
        ],
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
        rules: {
            "capitalized-comments": "off",
            "complexity": ["error", { max: 50, variant: "modified", },],
            "func-names": "off",
            "id-length": "off",
            "max-depth": ["error", 10,],
            "max-lines-per-function": "off",
            "max-lines": "off",
            "max-params": ["error", 10,],
            "max-statements": "off",
            "no-alert": "off",
            "no-console": "off",
            "no-continue": "off",
            "no-duplicate-imports": "off",
            "no-global-assign": "error",
            "no-inline-comments": "off",
            "no-magic-numbers": "off",
            "no-misleading-character-class": "off",
            "no-multi-assign": ["error", { ignoreNonDeclaration: true, },],
            "no-negated-condition": "off",
            "no-nested-ternary": "off",
            "no-param-reassign": "off",
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true, },],
            "no-return-assign": "off",
            "no-shadow": ["error", { builtinGlobals: true, },],
            "no-ternary": "off",
            "no-undefined": "off",
            "no-underscore-dangle": ["error", { allow: ["__coverage__",], enforceInClassFields: true, enforceInMethodNames: true, },],
            "one-var": "off",
            "require-unicode-regexp": ["error", { requireFlag: "v", },],
            "sort-imports": "off",
            "sort-keys": "off",
            ...qunit.configs.recommended.rules,
            "@stylistic/arrow-parens": ["error", "as-needed",],
            "@stylistic/max-statements-per-line": "off",
            "@stylistic/operator-linebreak": ["error", "after", { overrides: { "?": "after", ":": "before", }, },],
            "@stylistic/space-unary-ops": ["error", { overrides: { "!": true, }, },],
        },
    },
    {
        files: ["src/**/*.js",],
        rules: {
            "no-restricted-imports": ["error", {
                patterns: [{
                    group: ["../lib/*", "../lib/**",],
                    message: "Import from ../dist/ instead.",
                },],
            },],
        },
    },
    {
        files: ["**/*.md",],
        language: "markdown/gfm",
        plugins: {
            markdown,
        },
    },
    {
        files: ["**/*.json", ".hintrc",],
        language: "json/json",
        plugins: {
            json,
        },
    },
    {
        files: ["**/*.yml",],
        language: "yml/yaml",
        plugins: {
            yml,
        },
    },
    {
        files: ["**/*.html",],
        language: "html/html",
        plugins: {
            html,
        },
    },
    {
        files: ["**/*.css",],
        language: "css/css",
        plugins: {
            css,
        },
    },
    {
        plugins: {
            local: {
                rules: {
                    allowList: allowListRule,
                },
            },
        },
        rules: {
            "local/allowList": "error",
        },
    },
],);
