module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // 关闭缩进提示，pretieer设置了缩进为4
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        indent: ['off', 'tab'],
        'no-trailing-spaces': 0,
        // 不需要在每个语句的末尾使用分号
        semi: 'off',
        // 关闭对别名的审查
        'import/no-unresolved': 'off',
        // 关闭内置模块检查
        'import/no-extraneous-dependencies': 'off',
        // 支持根节点为非单个节点
        'vue/no-multiple-template-root': 'off',
        // 导入文件设置后缀
        'import/extensions': [
            'error',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                vue: 'always',
            },
        ],
        'func-names': ['error', 'never'],
        // 允许自增自减
        'no-plusplus': 'off',
        'object-curly-newline': 'off',
        'max-len': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        // 对象和数组的解构
        'prefer-destructuring': [
            'error',
            {
                array: false,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        // 允许更改函数入参的属性
        'no-param-reassign': ['error', { props: false }],
        'vue/script-setup-uses-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        'vue/comment-directive': [
            'error',
            {
                reportUnusedDisableDirectives: false,
            },
        ],
    },
}
