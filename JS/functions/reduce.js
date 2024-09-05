// [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

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
let c = reduce(arr, sum, 10);
console.log("b: ", b);
console.log("c: ", c);
