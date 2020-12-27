module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:node/recommended',
	],
	rules: {
		'import/extensions': ['off'],
		'import/prefer-default-export': ['off'],
		'global-require': ['off'],
		'arrow-parens': ['error', 'as-needed'],
		'camelcase': 'off',
		'comma-dangle': ['error', 'always-multiline'],
		'consistent-return': 'off',
		'curly': ['error', 'multi-or-nest', 'consistent'],
		'indent': ['error', 'tab'],
		'no-console': 'off',
		'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
		'no-param-reassign': ['error', { 'props': false }],
		'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
		'no-tabs': ['error', { 'allowIndentationTabs': true }],
		'no-trailing-spaces': 'error',
		'no-use-before-define': ['error', { 'functions': false }],
		'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
		'quotes': ['error', 'single', { 'avoidEscape': true }],
		'semi': ['error', 'never'],
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['.'],
				extensions: [
					'.js',
					'.ts',
				],
			},
		},
	},
}
