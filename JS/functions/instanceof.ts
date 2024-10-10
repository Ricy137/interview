// The `instanceof` operator allows to check whether an object belongs to a certain class. Inheritence is considered
// checking the prototype of the constructor exists in the object's prototype chain
const myInstanceof = (target: any, origin: any) => {
    // if (
    //     (typeof target !== "object" && typeof target !== "function") ||
    //     target == null
    // )
    //     return false;
    let proto = Object.getPrototypeOf(target);
    while (proto) {
        if (proto === origin.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};

let a = [1, 2, 3];
console.log(myInstanceof(a, Array)); //true
console.log(myInstanceof(a, Object)); //true
console.log(myInstanceof(a, String)); //false
console.log(myInstanceof(() => {}, Function)); // true
console.log(myInstanceof(() => {}, 1)); // false
console.log(myInstanceof(1, 1)); // false
