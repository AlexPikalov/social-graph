import { combineReducers } from '@ngrx/store';

import { graph, Graph } from './graph';

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
}

/**
 * Summare application reducer.
 */
export const appReducer = combineReducers({ graph });

/**
 * Returns current state of the graph from the application state
 * @param state application state
 */
export const getGraphState = function (state: State) {
  return state.graph;
};
