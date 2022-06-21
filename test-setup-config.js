import config from '@plone/volto/registry';

config.set('settings', {
  publicURL: 'http://localhost:3000',
  ...config.settings,
});
