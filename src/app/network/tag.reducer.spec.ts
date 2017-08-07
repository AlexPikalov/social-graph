import { tags } from './tag.reducer';
import { UpdateTagAction, ResetTagAction, TagAction } from './tag.actions';

describe('tags reducer', () => {
  it('should rebuild tag frequencies on UpdateTagAction', () => {
    const initTags = {};
    const action = new UpdateTagAction([['a'], ['b'], ['a']]);
    expect(tags(initTags, action)).toEqual({
      a: 2,
      b: 1
    });
  });

  it('should reset the graph on ResetGraphAction', () => {
    const initTags = {
      a: 3
    };
    const action = new ResetTagAction();
    expect(tags(initTags, action)).toEqual({});
  });


  it('should return current state by default', () => {
    const action = { type: 'unrecognized' };
    const state = { a: 3 };
    expect(tags(state, action as TagAction)).toEqual(state);
  });
});
