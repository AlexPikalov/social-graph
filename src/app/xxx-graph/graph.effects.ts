import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FETCH, UpdateGraphAction } from './graph.actions';
import { GraphService } from './graph.service';

/**
 * Graph related effects.
 *
 * @export
 * @class GraphEffects
 */
@Injectable()
export class GraphEffects  {
  constructor(
    private actions$: Actions,
    private graphService: GraphService
  ) {}

  /**
   * Fetch new connections effect.
   *
   * @type {Observable<Action>}
   * @memberof GraphEffects
   */
  @Effect()
  fetch$: Observable<Action> = this.actions$.ofType(FETCH)
    .switchMap(() => this.graphService.fetch())
    .map(graph => new UpdateGraphAction(graph));
}
