import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginQuery from '@tanstack/eslint-plugin-query';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	...pluginQuery.configs['flat/recommended'],

	{
		rules: {
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
		// Ignorar archivos generados automáticamente
		ignorePatterns: [
			'src/generated/**',
			'**/*.js', // si quieres ignorar todos los JS generados
		],
	},
];

export default eslintConfig;
