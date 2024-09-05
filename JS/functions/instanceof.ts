// The `instanceof` operator allows to check whether an object belongs to a certain class. Inheritence is considered
// checking the prototype of the constructor exists in the object's prototype chain
const myInstanceof = (target: any, origin: any) => {
    while (target) {
        if (target.__proto__ === origin.prototype) {
            return true;
        }
        target = target.__proto__;
    }
    return false;
};

let a = [1, 2, 3];
console.log(myInstanceof(a, Array)); //true
console.log(myInstanceof(a, Object)); //true
console.log(myInstanceof(a, String)); //false
