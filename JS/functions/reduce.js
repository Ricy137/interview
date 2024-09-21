// [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
Array.prototype.myMapWReduce = function (fn, thisValue) {
    let res = [];
    thisValue = thisValue ?? [];
    this.reduce(function (pre, cur, index, arr) {
        return res.push(fn.call(thisValue, cur, index, arr));
    }, []);
    return res;
};

const reduce = (arr, cb, initialValue) => {
    let num = initialValue == undefined ? arr[0] : initialValue;
    let i = initialValue == undefined ? 1 : 0;
    for (i; i < arr.length; i++) {
        num = cb(num, arr[i], i);
    }
    return num;
};

function sum(pre, cur, index) {
    return pre + cur;
}

let arr = [1, 2, 3, 4];
let b = reduce(arr, sum);
console.log("b: ", b);
const c = a.myMapWReduce((a) => a * 10);
console.log("c", c);
