async function test() {
    let arr = [4, 2, 1];
    const testRes = await check(100);
    console.log(testRes);
    arr.forEach(async (item) => {
        const res = await handleMicro(item);
        console.log(res);
    });
    console.log("end");
}

function handle(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, 1000 * x);
    });
}

function handleMicro(x) {
    return new Promise((resolve, reject) => {
        resolve(x);
    });
}

function check(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        });
    });
}

test();
