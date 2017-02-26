import { NgSliderPage } from './app.po';

describe('ng-slider App', () => {
  let page: NgSliderPage;

  beforeEach(() => {
    page = new NgSliderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
