import { TestBed, inject, async } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { NetworkService } from './network.service';
import { NetworkEffects } from './network.effects';
import {
  FETCH as GRAPH_FETCH,
  UpdateGraphAction,
} from './graph';

import {
  FETCH as TAG_FETCH,
  UpdateTagAction,
} from './tags';

describe('Network Effect', () => {
  let runner: EffectsRunner;
  let graphEffects: NetworkEffects;
  let graphService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      NetworkEffects,
      { provide: NetworkService, useValue: {} }
    ]
  }));

  it('should update graph', () => {
    runner = TestBed.get(EffectsRunner);
    graphEffects = TestBed.get(NetworkEffects);
    graphService = TestBed.get(NetworkService);

    graphService.fetch = jasmine.createSpy('fetch')
      .and.returnValue(Observable.of([[1]]));

    runner.queue({ type: GRAPH_FETCH });

    graphEffects.fetch$.subscribe(result => {
      expect(result).toEqual(new UpdateGraphAction([[1]]));
    });
  });

  it('should update tags', () => {
    runner = TestBed.get(EffectsRunner);
    graphEffects = TestBed.get(NetworkEffects);
    graphService = TestBed.get(NetworkService);

    graphService.tags = jasmine.createSpy('tags')
      .and.returnValue(Observable.of([['aaa']]));

    runner.queue({ type: TAG_FETCH });

    graphEffects.fetch$.subscribe(result => {
      expect(result).toEqual(new UpdateTagAction([['aaa']]));
    });
  });
});
