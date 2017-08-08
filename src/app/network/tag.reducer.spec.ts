import { tags } from './tag.reducer';
import { UpdateTagAction, ResetTagAction, TagAction } from './tag.actions';

describe('tags reducer', () => {
  it('should rebuild tag frequencies on UpdateTagAction', () => {
    const initTags = [];
    const action = new UpdateTagAction([['a'], ['b'], ['a']]);
    expect(tags(initTags, action)).toEqual([{name: 'a', freq: 2}, {name: 'b', freq: 1}]);
  });

  it('should reset the graph on ResetGraphAction', () => {
    const initTags = [{name: 'a', freq: 3}];
    const action = new ResetTagAction();
    expect(tags(initTags, action)).toEqual([]);
  });


  it('should return current state by default', () => {
    const action = { type: 'unrecognized' };
    const state = [{name: 'a', freq: 3}];
    expect(tags(state, action as TagAction)).toEqual(state);
  });
});
