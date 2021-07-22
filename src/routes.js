/**
 * Routes.
 * @module routes
 */

import { App, Search } from '@plone/volto/components';
import voltoRoutes from '@plone/volto/routes';
import config from '@plone/volto/registry';

export const italiaRoutes = [
  // Add design-volto-theme routes here
  {
    path: '/**/search',
    component: Search,
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
    routes: [...italiaRoutes, ...voltoRoutes[0].routes],
  },
];

export default routes;
