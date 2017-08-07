import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FETCH, UpdateGraphAction } from './graph.actions';
import { NetworkService } from './network.service';

/**
 * Graph related effects.
 *
 * @export
 * @class NetworkEffects
 */
@Injectable()
export class NetworkEffects  {
  constructor(
    private actions$: Actions,
    private graphService: NetworkService
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
