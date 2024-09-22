Function.prototype.myCall = function (context, ...args) {
    if (typeof this != "function") {
        throw new Error("Not a function");
    }
    let obj = context ?? globalThis;
    let fn = Symbol("fn");
    obj[fn] = this;
    res = obj[fn](...args);
    delete obj[fn];
    return res;
};

Function.prototype.myApply = function (context) {
    let obj = context ?? window;
    obj.fn = this;
    const arg = arguments[1] ?? [];
    let res = obj.fn(...arg);
    delete obj.fn;
    return res;
};

Function.prototype.bind = function (context, ...outerArgs) {
    let that = this;
    function res(...innerArgs) {
        if (this instanceof res) {
            that.call(this, ...outerArgs, ...innerArgs);
        } else {
            that.call(context, ...outerArgs, ...innerArgs);
        }
    }
    res.prototype = this.prototype;
    return res;
};
