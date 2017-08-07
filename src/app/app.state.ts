import { combineReducers } from '@ngrx/store';

import { graph, Graph, tags, Tags } from './network';

/**
 * Application store state interface.
 *
 * @export
 * @interface State
 */
export interface State {
  /**
   * Graph state
   *
   * @type {Graph}
   * @memberof State
   */
  graph: Graph;

  /**
   * Tags state
   *
   * @type {Tags}
   * @memberof State
   */
  tags: Tags;
}

/**
 * Summare application reducer.
 */
export function reducer(state: any, action: any) {
  return combineReducers({ graph, tags })(state, action);
}

/**
 * Returns current state of the graph from the application state
 * @param state application state
 * @returns {Graph}
 */
export function getGraphState(state: State): Graph {
  return state.graph;
}

/**
 * Returns current state of tags from the application state
 *
 * @export
 * @param {State} state appication state
 * @returns {Tags}
 */
export function getTagsState(state: State): Tags {
  return state.tags;
}
