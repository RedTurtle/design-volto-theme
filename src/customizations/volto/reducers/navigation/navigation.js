/**
 * Navigation reducer.
 * @module reducers/navigation/navigation
 */

/*
 CUSTOMIZATIONS:
 - customized getRecursiveItems to use remoteUrl property for plone types 'Link' objects
 */

import { map } from 'lodash';
import { flattenToAppURL } from '@plone/volto/helpers';

import { GET_NAVIGATION } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

/**
 * Recursive function that process the items returned by the navigation
 * endpoint
 * @function getRecursiveItems
 * @param {array} items The items inside a navigation response.
 * @returns {*} The navigation items object (recursive)
 */
function getRecursiveItems(items) {
  return map(items, (item) => ({
    title: item.title,
    url: item.remoteUrl ?? flattenToAppURL(item['@id']),
    ...(item.items && { items: getRecursiveItems(item.items) }),
  }));
}

/**
 * Navigation reducer.
 * @function navigation
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_NAVIGATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_NAVIGATION}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: getRecursiveItems(action.result.items),
        loaded: true,
        loading: false,
      };
    case `${GET_NAVIGATION}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
