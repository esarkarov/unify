export default {
  'apps/frontend/**/*.{js,jsx,ts,tsx}': ['pnpm --filter frontend exec eslint --fix', 'prettier --write'],
  'apps/backend/**/*.{js,jsx,ts,tsx}': ['pnpm --filter backend exec eslint --fix', 'prettier --write'],
  'src/**/*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'apps/**/*.{css,scss,html}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
