//Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.

function delay(f: Function, ms: number): Function {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}
