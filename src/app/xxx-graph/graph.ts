/**
 * Social graph interface
 *
 * @export
 * @interface Graph
 */
export interface Graph {
  /**
   * Graph connections in format [[nodeA, nodeB], [nodeB, nodeC], ...].
   *
   * @type {number[][]}
   * @memberof Graph
   */
  connections: number[][];

  /**
   * Graph nodes in format [nodeA, nodeB, nodeC, ...]
   *
   * @type {number[]}
   * @memberof Graph
   */
  nodes: number[];
}
