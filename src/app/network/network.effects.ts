import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FETCH as GRAPH_FETCH, UpdateGraphAction } from './graph.actions';
import { NetworkService } from './network.service';
import { FETCH as TAGS_FETCH, UpdateTagAction } from './tags';

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
   * @memberof NetworkEffects
   */
  @Effect()
  fetch$: Observable<Action> = this.actions$.ofType(GRAPH_FETCH)
    .switchMap(() => this.graphService.fetch())
    .map(graph => new UpdateGraphAction(graph));

  /**
   * Fetch tags effect.
   *
   * @type {Observable<Action>}
   * @memberof NetworkEffects
   */
  @Effect()
  tags$: Observable<Action> = this.actions$.ofType(TAGS_FETCH)
    .switchMap(action => this.graphService.tags(action.payload))
    .catch(() => [])
    .map(tags => new UpdateTagAction(tags));
}
