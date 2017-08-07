import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  Graph,
  FetchGraphAction,
  ResetGraphAction,
  Tags,
  FetchTagAction
} from './network';
import { State, getGraphState, getTagsState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  graph: Observable<Graph>;

  tags: Observable<Tags>;

  subscription: Subscription;

  constructor(private store: Store<State>) {
    this.graph = this.store.select(getGraphState);
    this.tags = this.store.select(getTagsState);

    this.subscription = this.graph
      .subscribe(graph => this.refreshTags(graph));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  /**
   * Refresh tags for actual network
   *
   * @private
   * @param {Graph} graph
   * @memberof AppComponent
   */
  private refreshTags(graph: Graph) {
    this.store.dispatch(new FetchTagAction(graph.nodes));
  }
}
