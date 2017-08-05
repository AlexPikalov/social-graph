import * as R from 'ramda';

import { GraphAction, FETCH, UPDATE, RESET } from './graph.actions';
import { Graph } from './graph';

/**
 * graph is the graph reducer.
 *
 * @export
 * @param {Graph} [state=emptyGraph()] initial state
 * @param {GraphAction} action action has been applied
 * @returns {Graph}
 */
export function graph(state: Graph = emptyGraph(), action: GraphAction): Graph {
  switch (action.type) {
    case UPDATE:
      return updateGraph(state, action.payload);
    case RESET:
      return emptyGraph();
    default:
      return emptyGraph();
  }
}

/**
 * emptyGraph is factory function that returns new empty social graph.
 *
 * @returns {Graph}
 */
function emptyGraph(): Graph {
  return {
    connections: [],
    nodes: []
  };
}

/**
 * updateGraph updates current social graph basing on provided new connections
 *
 * @param {Graph} graph initial social graph
 * @param {number[][]} newConnections list of new connections
 * @returns {Graph} updated graph
 */
function updateGraph(graph: Graph, newConnections: number[][]): Graph {
  const connections = mergeUniq(graph.connections, newConnections)(connectionsEquals);
  const nodes = mergeUniq(graph.nodes, R.flatten(newConnections))(R.equals);

  return { connections, nodes };
}

/**
 * addUniq concatenates list and delta and keeps unique items
 * (inique in terms of R.equals).
 *
 * @template T
 * @param {T[]} list
 * @param {T[]} delta
 * @returns {Function} concatenated list of unique items
 */
function mergeUniq<T>(list: T[], delta: T[]): Function {
  return R.uniqWith(R.__, [...list, ...delta]);
}

/**
 * connectionsEquals returns true if connections equal and false otherwise.
 * Following connections should be considered as equal:
 * [x, y] ~ [x, y]
 * [x, y] ~ [y, x]
 *
 * @template T
 * @param {T[]} a connection
 * @param {T[]} b connection
 * @returns {boolean}
 */
function connectionsEquals<T>(a: T[], b: T[]): boolean {
  return R.equals(a, b) || R.equals(a, R.reverse(b));
}
