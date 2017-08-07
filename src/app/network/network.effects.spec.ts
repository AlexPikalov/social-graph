import { TestBed, inject, async } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { NetworkService } from './network.service';
import { NetworkEffects } from './network.effects';
import { FETCH, UPDATE, UpdateGraphAction } from './graph.actions';

describe('My Effect', () => {
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

  it('should return a LOGIN_SUCCESS action after logging in', () => {
    runner = TestBed.get(EffectsRunner);
    graphEffects = TestBed.get(NetworkEffects);
    graphService = TestBed.get(NetworkService);

    graphService.fetch = jasmine.createSpy('fetch')
      .and.returnValue(Observable.of([[1]]));

    runner.queue({ type: FETCH });

    graphEffects.fetch$.subscribe(result => {
      expect(result).toEqual(new UpdateGraphAction([[1]]));
    });
  });
});
