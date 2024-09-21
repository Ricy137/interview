Array.prototype.mySplice = function (start, deletedCount, ...items) {
    start =
        start < 0
            ? Math.max(this.length + start, 0)
            : Math.min(this.length, start);

    if (!deletedCount) {
        deletedCount = this.length - start;
    } else {
        deletedCount = Math.min(Math.max(deletedCount, 0), this.length);
    }
    const deletedEles = this.slice(start, start + deletedCount);
    const before = this.slice(0, start);
    const after = this.slice(start + deletedCount);
    const newArr = before.concat(items, after);
    this.length = newArr.length;
    for (let i = 0; i < newArr.length; i++) {
        this[i] = newArr[i];
    }
    return deletedEles;
};

let arr = [1, 2, 3, 4, 5];
let removed = arr.mySplice(2, 2, "a", "b"); // Removes 2 elements starting from index 2, inserts 'a' and 'b'
console.log(removed); // [3, 4]
console.log(arr); // [1, 2, 'a', 'b', 5]
