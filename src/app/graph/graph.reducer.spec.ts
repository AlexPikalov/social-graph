import { graph } from './graph.reducer';
import { UpdateGraphAction, ResetGraphAction } from './graph.actions';

describe('graph reducer', () => {
  it('should add unique connections to the graph on UpdateGraphAction', () => {
    const initGraph = {
      connections: [[1, 2]],
      nodes: [1, 2]
    };
    const action = new UpdateGraphAction([[3, 4], [2, 1], [1, 2], [2, 3]]);
    expect(graph(initGraph, action)).toEqual({
      connections: [[1, 2], [3, 4], [2, 3]],
      nodes: [1, 2, 3, 4]
    });
  });

  it('should reset the graph on ResetGraphAction', () => {
    const initGraph = {
      connections: [[1, 2]],
      nodes: [1, 2]
    };
    const action = new ResetGraphAction();
    expect(graph(initGraph, action)).toEqual({
      connections: [],
      nodes: []
    });
  });
});
