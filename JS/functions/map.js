// [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
//Scratch
Array.prototype.myMap = function (fn, thisValue) {
    let res = [];
    thisValue = thisValue ?? [];
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        res.push(fn.call(thisValue, arr[i], i, arr));
    }
    return res;
};

//with [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
Array.prototype.myMapWReduce = function (fn, thisValue) {
    let res = [];
    thisValue = thisValue ?? [];
    this.reduce(function (pre, cur, index, arr) {
        return res.push(fn.call(thisValue, cur, index, arr));
    }, []);
    return res;
};

const a = [1, 2, 3];
const b = a.myMap((a, i) => a * 10);
const c = a.myMapWReduce((a) => a * 10);
console.log("b", b);
console.log("c", c);
