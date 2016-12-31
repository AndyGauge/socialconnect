import { SocialconnectPage } from './app.po';

describe('socialconnect App', function() {
  let page: SocialconnectPage;

  beforeEach(() => {
    page = new SocialconnectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
