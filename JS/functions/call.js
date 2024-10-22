Function.prototype.myCall = function (context, ...args) {
    let obj = context ?? globalThis;
    let fn = Symbol("fn");
    obj[fn] = this;
    let res = obj[fn](...args);
    delete obj[fn];
    return res;
};

Function.prototype.myApply = function (context, args) {
    let obj = context ?? globalThis;
    let fn = Symbol("fn");
    obj[fn] = this;
    let res = Arrays.isArray(args) ? obj[fn](...args) : obj[fn]();
    delete obj.fn;
    return res;
};

Function.prototype.myBind = function (context, ...args) {
    const wrapper = (...innerArgs) => {
        if (this instanceof wrapper) {
            return this.apply(this, [...args, ...innerArgs]);
        } else {
            return this.apply(context, [...args, ...innerArgs]);
        }
    };
    wrapper.prototype = Object.create(this.prototype);
    return wrapper;
};
