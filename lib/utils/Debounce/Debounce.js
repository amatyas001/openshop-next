export const Debounce = (callback, delay) => {
  let timeout, event;
  return function () {
    let _this = this,
      _args = arguments;
    const handler = () => {
      (timeout = null), (event = callback.apply(_this, _args));
    };
    return (
      clearTimeout(timeout),
      (timeout = setTimeout(handler, delay)),
      /*istanbul ignore next*/ !timeout && (event = callback.apply(_this, _args)),
      event
    );
  };
};
