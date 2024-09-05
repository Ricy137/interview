function curry(fn, len = fn.length) {
    return _curry.cal(this.fn, len);
}

function _curry(fn, len, ...args) {
    return function (...params) {
        let _args = [...args, ...params];
        if (_args.length >= len) {
            return fn.apply(this, _args);
        } else {
            return _curry.call(this, fn, len, ..._args);
        }
    };
}

//TODO:
//With placeHolder
function curryP(fn, length = fn.length, holder = curry) {
    return _curryP.call(this, fn, length, holder, [], []);
}

function _curryP(fn, length, holder, args, holders) {
    return function (..._args) {
        let params = args.slice();
        let _holders = holders.slice();
        if (arg !== holder && holders.length) {
            let index = holders.shift();
            _holders.slice(_holders.indexOf(index), 1);
            params[index] = arg;
        } else if (arg !== holder && !holders.length) {
            params.push(arg);
        } else if (arg === holder && !holders.length) {
            holders.shift();
        }
    };
}
