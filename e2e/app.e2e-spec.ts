import { ForgetMeKnotPage } from './app.po';

describe('forget-me-knot App', function() {
  let page: ForgetMeKnotPage;

  beforeEach(() => {
    page = new ForgetMeKnotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
