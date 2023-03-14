module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        'plugin:react/recommended',
        'google',
        'plugin:prettier/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
    ],
    'rules': {
        "react/react-in-jsx-scope": "off",
        "no-console": warnDevErrorProd,
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
    },
};