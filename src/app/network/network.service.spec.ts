import { async } from '@angular/core/testing';

import { NetworkService } from './network.service';

describe('GraphService', () => {
  let service: NetworkService;

  beforeEach(() => {
    service = new NetworkService();
  });

  it('should be instantiated', () => {
    expect(service).toBeDefined();
  });

  it('should fetch new relations', async(() => {
    const newRelations = [[1, 2]];
    spyOn(store, 'sample').and.returnValue(Promise.resolve(newRelations));
    service.fetch().subscribe(data => {
      expect(data).toEqual(newRelations);
      expect(store.sample).toHaveBeenCalled();
    });
  }));

  it('should get new tags', async(() => {
    const newTags = [['tag1', 'tag2']];
    const forMembers = [1];
    spyOn(store, 'tags').and.returnValue(Promise.resolve(newTags));
    service.tags(forMembers).subscribe(data => {
      expect(data).toEqual(newTags);
      expect(store.tags).toHaveBeenCalledWith(forMembers);
    });
  }));
});
