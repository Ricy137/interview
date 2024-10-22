Function.prototype.myCall = function (context, ...args) {
    let obj = context ?? globalThis;
    let fn = Symbol("fn");
    obj[fn] = this;
    let res = obj[fn](...args);
    delete obj[fn];
    return res;
};

Function.prototype.myApply = function (context, args) {
    if (typeof this != "function") {
        throw new Error("Not a function");
    }
    let obj = context ?? globalThis;
    let fn = Symbol("fn");
    obj[fn] = this;
    let res = Arrays.isArray(args) ? obj[fn](...args) : obj[fn]();
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
