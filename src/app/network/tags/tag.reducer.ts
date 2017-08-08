import * as R from 'ramda';

import { TagAction, FETCH, UPDATE, RESET } from './tag.actions';
import { Tags } from './tags';

const defaultGraph = emptyTags();

/**
 * tags is the tags reducer.
 *
 * @export
 * @param {Tags} [state] initial state
 * @param {TagAction} action action has been applied
 * @returns {Tags}
 */
export function tags(state: Tags = defaultGraph, action: TagAction): Tags {
  switch (action.type) {
    case UPDATE:
      return calculateTags(action.payload);
    case RESET:
      return emptyTags();
    default:
      return state;
  }
}

/**
 * emptyTags is factory function that returns new empty tags map.
 *
 * @returns {Tags}
 */
function emptyTags(): Tags {
  return [];
}

/**
 * calculateTags takes a list of tags and retuns a frequency map like
 *
 * @param payload list of tags
 */
function calculateTags(payload: string[][]): Tags {
  const flatten = R.flatten(payload);
  const getTagGroups = R.groupBy(R.identity);
  const pairs = R.toPairs(getTagGroups(flatten));
  return R.map(kv => ({ name: kv[0], freq: kv[1].length }), pairs);
}
