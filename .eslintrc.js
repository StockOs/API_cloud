module.exports = {
    root: true,
    env: {
        node: true,
        "es6": true
    },
    'extends': [
        'eslint:recommended'
    ],
    parserOptions: {
        "ecmaVersion": 2017
    },
    "rules": {
        "semi": ["warn", "never"],
    }
}
