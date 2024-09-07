const STATUS = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
};

class MyPromise {
    constructor(executor) {
        // Initial state
        this.state = STATUS.PENDING; // Can be 'pending', 'fulfilled', or 'rejected'
        this.value = null;
        this.onFulfilledCallbacks = []; // To handle then chaining
        this.onRejectedCallbacks = [];

        // Resolve function
        const resolve = (value) => {
            if (this.state !== STATUS.PENDING) return;
            this.state = STATUS.FULFILLED;
            this.value = value;

            // Call all stored success handlers
            this.onFulfilledCallbacks.forEach((callback) =>
                callback.onFulfilled(value)
            );
        };

        // Reject function
        const reject = (reason) => {
            if (this.state !== STATUS.PENDING) return;
            this.state = STATUS.REJECTED;
            this.value = reason;

            // Call all stored failure handlers
            this.onRejectedCallbacks.forEach((callback) =>
                callback.onRejected(reason)
            );
        };

        // Execute the executor function with resolve and reject
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    // then() function
    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason;
                  };
        if (this.state === STATUS.FULFILLED) {
            onFulfilled(this.value);
        } else if (this.state === STATUS.REJECTED) {
            onRejected(this.reason);
        } else {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        return this;
    }

    // catch() function
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let results = [];
            let completed = 0;
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise)
                    .then((value) => {
                        results[index] = value;
                        completed++;
                        if (completed === promises.length) {
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

    static resolve(value) {
        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}
