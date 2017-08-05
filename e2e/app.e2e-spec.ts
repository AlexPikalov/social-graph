import { SocialGraphPage } from './app.po';

describe('social-graph App', () => {
  let page: SocialGraphPage;

  beforeEach(() => {
    page = new SocialGraphPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
