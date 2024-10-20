// function myNew(constructor, ...args) {
//     const obj = {};
//     Object.setPrototypeOf(obj, constructor.prototype);
//     const res = constructor.apply(obj, args);
//     return res instanceof Object ? res : obj;
// }

function myNew(constructor, ...args) {
    let obj = Object.create(constructor.prototype);
    let res = constructor.apply(obj, args);
    return res instanceof Object ? res : obj;
}
