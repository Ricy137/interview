// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.myFilter = function (fn, thisArg) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (fn.call(thisArg, this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
};

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.myFilter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
