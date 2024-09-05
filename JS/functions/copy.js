// Shadow copy
// Object.assign(target, obj)

// const newArr=arr.concat()
// const newArr=arr.slice()

// Deep copy
// Json
// const a= JSON.parse(JSON.stringify(b))

//recursive
function deepCopy(newObj, oldObj) {
    for (let k in oldObj) {
        let item = oldObj[k];
        if (item instanceof Array) {
            newObj[k] = [];
            deepCopy(newObj[k], item);
        } else if (item instanceof Object) {
            newObj[k] = {};
            deepCopy(newObj[k], item);
        } else {
            newObj[k] = item;
        }
    }
}
