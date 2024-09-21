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

const a = [1, 2, 3];
const b = a.myMap((a, i) => a * 10);
console.log("b", b);
