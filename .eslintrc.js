module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "vue/script-indent": [
            "error",
            4,
            {
                "baseIndent": 1
            }
        ],
        "vue/html-indent": [
            "error",
            4,
            {
                "baseIndent": 1
            }
        ],
        "vue/no-v-html": "off"
    },
};
