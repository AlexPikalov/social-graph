import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
/**
 * GraphService is a wrapper around global window.store
 */
export class NetworkService {
  private store = store;

  /**
   * It fetches another 10 relations of the social graph.
   *
   * @returns {Observable<number[][]>} observable list of links.
   * @memberof GraphService
   */
  fetch(): Observable<number[][]> {
    return Observable.fromPromise(this.store.sample());
  }

  /**
   * It gets tags for provided member ids
   *
   * @param {(string|number[])} ids array of member IDs
   * @returns {Observable<string[][]>} observable map of arrays of tags per member
   * @memberof GraphService
   */
  tags(ids: string|number[]): Observable<string[][]> {
    return Observable.fromPromise(this.store.tags(ids));
  }
}
