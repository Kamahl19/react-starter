module.exports = {
  stories: ['../src/**/story.tsx'],
  presets: ['@storybook/preset-create-react-app'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
  ],
};
