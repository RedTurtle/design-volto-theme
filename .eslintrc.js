const path = require('path');
const projectRootPath = path.resolve('.');
const packageJson = require(path.join(projectRootPath, 'package.json'));

// Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
const addonsAliases = [];
if (packageJson.addons) {
  const addons = packageJson.addons;
  addons.forEach((addon) => {
    const addonPath = `@italia/addons/${addon}/src`;
    addonsAliases.push([`@italia/addons/${addon}`, addonPath]);
  });
}

module.exports = {
  extends: './node_modules/@plone/volto/.eslintrc',
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', '@plone/volto/src'],
          ['@package', './src'],
          ['@italia', './src'],
          ...addonsAliases,
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
