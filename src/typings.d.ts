/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var store: Store;
interface Store {
  sample: SampleFunc;
  tags: TagsFunc;
}

interface SampleFunc {
  (): Promise<number[][]>;
}

interface TagsFunc {
  (ids: string|number[]): Promise<string[][]>;
}
