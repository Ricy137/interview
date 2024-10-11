const STATUS = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
};

class MyPromise {
    constructor(executor) {
        this.state = STATUS.PENDING;
        this.value = null;
        this.handlers = [];
        this.catchers = [];

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }

    _resolve(value) {
        if (this.state !== STATUS.PENDING) return;

        this.state = STATUS.FULFILLED;
        this.value = value;

        this.handlers.forEach((handler) => handler(value));
    }

    _reject(error) {
        if (this.state !== STATUS.PENDING) return;

        this.state = STATUS.REJECTED;
        this.value = error;

        this.catchers.forEach((catcher) => catcher(error));
    }

    then(successCallback) {
        return new MyPromise((resolve, reject) => {
            if (this.state === STATUS.FULFILLED) {
                try {
                    const result = successCallback(this.value);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            } else if (this.state === STATUS.PENDING) {
                this.handlers.push((value) => {
                    try {
                        const result = successCallback(value);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (this.state === STATUS.REJECTED) {
                reject(this.value);
            }
        });
    }

    catch(failureCallback) {
        return new MyPromise((resolve, reject) => {
            if (this.state === STATUS.REJECTED) {
                try {
                    const result = failureCallback(this.value);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            } else if (this.state === STATUS.PENDING) {
                this.catchers.push((error) => {
                    try {
                        const result = failureCallback(error);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            } else if (this.state === STATUS.FULFILLED) {
                resolve(this.value);
            }
        });
    }

    // Static methods for `MyPromise.all` and `MyPromise.race`
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let results = [];
            let completedPromises = 0;

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise)
                    .then((value) => {
                        results[index] = value;
                        completedPromises++;

                        if (completedPromises === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch(reject);
            });
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                MyPromise.resolve(promise).then(resolve).catch(reject);
            });
        });
    }

    // Ensures that values or other MyPromises are handled correctly
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}

const pResolve = new MyPromise((resolve) => resolve("Success"));
pResolve.then((value) => console.log(value)); // Output: Success

const pReject = new MyPromise((_, reject) => reject("Error"));
pReject.catch((err) => console.log(err)); // Output: Error

const pChain = new MyPromise((resolve) => resolve(1));
pChain.then((value) => value + 1).then((value) => console.log(value)); // Output: 2

MyPromise.all([
    new MyPromise((resolve) => resolve(1)),
    new MyPromise((resolve) => resolve(2)),
]).then((values) => console.log(values)); // Output: [1, 2]

MyPromise.race([
    new MyPromise((resolve) => setTimeout(() => resolve("First"), 100)),
    new MyPromise((resolve) => setTimeout(() => resolve("Second"), 200)),
]).then((value) => console.log(value)); // Output: First

const p = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("Resolved after 1 second");
    }, 1000);
});

p.then((value) => console.log(value));
