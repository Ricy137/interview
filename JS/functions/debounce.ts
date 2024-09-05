function debounce(func: Function, wait: number) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
