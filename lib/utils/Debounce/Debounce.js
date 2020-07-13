export const Debounce = (callback, delay) => {
  let timeout;
  let event;
  return function () {
    const _this = this;
    const _args = arguments;
    const handler = () => {
      (timeout = null), (event = callback.apply(_this, _args));
    };
    return (
      clearTimeout(timeout),
      (timeout = setTimeout(handler, delay)),
      /* istanbul ignore next */ !timeout && (event = callback.apply(_this, _args)),
      event
    );
  };
};
