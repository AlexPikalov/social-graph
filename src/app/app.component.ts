import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Graph, FetchGraphAction, ResetGraphAction } from './network';
import { State, getGraphState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  graph: Observable<Graph>;

  constructor(private store: Store<State>) {
    this.graph = this.store.select(getGraphState);
  }

  /**
   * Add new portion of a social network.
   *
   * @memberof AppComponent
   */
  add() {
    this.store.dispatch(new FetchGraphAction());
  }

  /**
   * Reset currnt social network.
   *
   * @memberof AppComponent
   */
  reset() {
    this.store.dispatch(new ResetGraphAction());
  }
}
