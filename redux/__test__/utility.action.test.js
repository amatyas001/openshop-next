import { SCROLL, scroll } from '../actions';

// DOM scroll position for ScrollToTop
describe('scroll action', () => {
  it('should create proper action without payload', () => {
    const expected = {
      type: SCROLL,
      payload: false,
    };
    expect(scroll()).toEqual(expected);
  });

  it('should create proper action with payload', () => {
    const payload = 100;
    const expected = {
      type: SCROLL,
      payload,
    };
    expect(scroll(payload)).toEqual(expected);
  });
});