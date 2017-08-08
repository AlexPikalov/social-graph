import { Action } from '@ngrx/store';

/**
 * Fetch new portion of the graph action type.
 */
export const FETCH = 'TAG.FETCH';

/**
 * Update graph action type.
 */
export const UPDATE = 'TAG.UPDATE';

/**
 * Reset graph action type.
 */
export const RESET = 'TAG.RESET';

/**
 * Fetch new portion of the graph action.
 */
export class FetchTagAction implements Action {
  readonly type = FETCH;

  constructor(public readonly payload: number[]) {}
}

/**
 * Update graph action type.
 */
export class UpdateTagAction implements Action {
  readonly type = UPDATE;

  constructor(public readonly payload: string[][]) {}
}

/**
 * Reset graph action type.
 */
export class ResetTagAction implements Action {
  readonly type = RESET;
}

/**
 * Consolidated graph action type.
 */
export type TagAction = FetchTagAction | UpdateTagAction | ResetTagAction;
