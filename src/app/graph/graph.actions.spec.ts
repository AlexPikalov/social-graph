import {
  FETCH,
  UPDATE,
  RESET,
  FetchGraphAction,
  UpdateGraphAction,
  ResetGraphAction
} from './graph.actions';

describe('Graph actions', () => {
  it('should create FetchGraphAction', () => {
    const _payload = [];
    const { type, payload } = new FetchGraphAction(_payload);
    expect(type).toBe(FETCH);
    expect(payload).toBe(_payload);
  });

  it('should create UpdateGraphAction', () => {
    const _payload = [];
    const { type, payload } = new UpdateGraphAction(_payload);
    expect(type).toBe(UPDATE);
    expect(payload).toBe(_payload);
  });

  it('should create ResetGraphAction', () => {
    const { type } = new ResetGraphAction();
    expect(type).toBe(RESET);
  });
});
