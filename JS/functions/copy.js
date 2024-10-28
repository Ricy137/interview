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
        if (oldObj.hasOwnProperty(k)) {
            let item = oldObj[k];
            if (Array.isArray(item)) {
                newObj[k] = [];
                deepCopy(newObj[k], item);
            } else if (typeof item === "object" && item !== null) {
                newObj[k] = {};
                deepCopy(newObj[k], item);
            } else {
                newObj[k] = item;
            }
        }
    }
}

// function deepCopy(source) {
//     if (Array.isArray(source)) {
//         return source.map(deepCopy); // Recursively copy each item in the array
//     } else if (typeof source === "object" && source !== null) {
//         const copy = {};
//         for (let key in source) {
//             if (source.hasOwnProperty(key)) {
//                 copy[key] = deepCopy(source[key]); // Recursively copy each property
//             }
//         }
//         return copy;
//     } else {
//         return source; // For primitives, return the value as is
//     }
// }

const source = {
    a: {
        b: {
            name: ["a", "b", "c"],
            obj: {
                d: "GoodLuck",
            },
        },
    },
    c: 111,
};

const target = {};
const test = {};
deepCopy(target, source);
Object.assign(test, source);
console.log(JSON.stringify(source));
console.log(JSON.stringify(target));
console.log(JSON.stringify(test));
