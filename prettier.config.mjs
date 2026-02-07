/** @type {import('prettier').Config} */
const config = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]'
  ],
  attributeGroups: ['$DEFAULT', 'className'],
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    '@xeonlink/prettier-plugin-organize-attributes'
  ]
}

export default config
