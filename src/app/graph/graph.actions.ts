import { Action } from '@ngrx/store';

import { Graph } from './graph';

/**
 * Fetch new portion of the graph action type.
 */
export const FETCH = 'GRAPH.FETCH';

/**
 * Update graph action type.
 */
export const UPDATE = 'GRAPH.UPDATE';

/**
 * Reset graph action type.
 */
export const RESET = 'GRAPH.RESET';

/**
 * Fetch new portion of the graph action.
 */
export class FetchGraphAction implements Action {
  readonly type = FETCH;

  constructor(public readonly payload: number[][]) {}
}

/**
 * Update graph action type.
 */
export class UpdateGraphAction implements Action {
  readonly type = UPDATE;

  constructor(public readonly payload: number[][]) {}
}

/**
 * Reset graph action type.
 */
export class ResetGraphAction implements Action {
  readonly type = RESET;
}

/**
 * Consolidated graph action type.
 */
export type GraphAction = FetchGraphAction | UpdateGraphAction | ResetGraphAction;
