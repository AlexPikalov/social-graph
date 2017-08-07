import {
  FETCH,
  UPDATE,
  RESET,
  FetchTagAction,
  UpdateTagAction,
  ResetTagAction
} from './tag.actions';

describe('Tag actions', () => {
  it('should create FetchGraphAction', () => {
    const _payload = [];
    const { type } = new FetchTagAction([]);
    expect(type).toBe(FETCH);
  });

  it('should create UpdateGraphAction', () => {
    const _payload = [];
    const { type, payload } = new UpdateTagAction(_payload);
    expect(type).toBe(UPDATE);
    expect(payload).toBe(_payload);
  });

  it('should create ResetGraphAction', () => {
    const { type } = new ResetTagAction();
    expect(type).toBe(RESET);
  });
});
