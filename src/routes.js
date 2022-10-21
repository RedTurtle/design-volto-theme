/**
 * Routes.
 * @module routes
 */

import { App, Search, Contents } from '@plone/volto/components';
import { defaultRoutes, multilingualRoutes } from '@plone/volto/routes';
import config from '@plone/volto/registry';

export const italiaRoutes = [
  // Add design-volto-theme routes here
  {
    path: '/**/search',
    component: Search,
  },
  // TO DO: DA RIMUOVERE QUANDO AGGIORNIAMO A VOLTO16
  {
    path: ['/contents', '/**/contents'],
    component: Contents,
  },
];

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      ...italiaRoutes,
      ...(config.addonRoutes || []),
      ...((config.settings?.isMultilingual && multilingualRoutes) || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
