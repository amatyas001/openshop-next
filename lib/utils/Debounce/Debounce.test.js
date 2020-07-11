import { Debounce } from '@app/lib/utils';

describe('Debounce', () => {
  it('should debounce a function', () => {
    const mock = jest.fn();
    const debounce = Debounce(() => mock(), 100);
    jest.useFakeTimers();
    debounce();
    expect(mock).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
