// [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
//Scratch
Array.prototype.myMap = function (fn, thisValue) {
    let res = [];
    // null or undefined are also valid as the context `this`
    // thisValue = thisValue ?? [];
    //let arr = this;
    for (let i = 0; i < this.length; i++) {
        res.push(fn.call(thisValue, this[i], i, this));
    }
    return res;
};

const a = [1, 2, 3];
const b = a.myMap((a, i) => a * 10);
console.log("b", b);
