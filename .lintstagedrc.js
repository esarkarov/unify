export default {
  'apps/frontend/**/*.{js,jsx,ts,tsx}': (filenames) => {
    const normalizedFiles = filenames.map((f) => f.replace(/\\/g, '/'));
    const relativeFiles = normalizedFiles.map((f) => f.replace('apps/frontend/', '')).join(' ');
    return [
      `cd apps/frontend && pnpm exec eslint --fix ${relativeFiles}`,
      `prettier --write ${normalizedFiles.join(' ')}`,
    ];
  },
  'apps/backend/**/*.{js,jsx,ts,tsx}': (filenames) => {
    const normalizedFiles = filenames.map((f) => f.replace(/\\/g, '/'));
    const relativeFiles = normalizedFiles.map((f) => f.replace('apps/backend/', '')).join(' ');
    return [
      `cd apps/backend && pnpm exec eslint --fix ${relativeFiles}`,
      `prettier --write ${normalizedFiles.join(' ')}`,
    ];
  },
  'apps/**/*.{css,scss,html}': ['prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
