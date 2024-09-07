const STATUS = {
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
};

class CustomPromise {
    constructor(executor) {
        // Initial state
        this.state = STATUS.PENDING; // Can be 'pending', 'fulfilled', or 'rejected'
        this.value = undefined;
        this.callbacks = []; // To handle then/catch chaining

        // Resolve function
        const resolve = (value) => {
            if (this.state !== STATUS.PENDING) return;
            this.state = STATUS.FULFILLED;
            this.value = value;

            // Call all stored success handlers
            this.callbacks.forEach((callback) => callback.onFulfilled(value));
        };

        // Reject function
        const reject = (reason) => {
            if (this.state !== STATUS.PENDING) return;
            this.state = status.rejected;
            this.value = reason;

            // Call all stored failure handlers
            this.callbacks.forEach((callback) => callback.onRejected(reason));
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
        return new CustomPromise((resolve, reject) => {
            // Success handler
            const handleFulfilled = (value) => {
                try {
                    const result = onFulfilled ? onFulfilled(value) : value;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            // Failure handler
            const handleRejected = (reason) => {
                try {
                    const result = onRejected ? onRejected(reason) : reason;
                    reject(result);
                } catch (error) {
                    reject(error);
                }
            };

            // If the promise is already settled, handle it immediately
            if (this.state === status.fulfilled) {
                handleFulfilled(this.value);
            } else if (this.state === status.rejected) {
                handleRejected(this.value);
            } else {
                // If the promise is still pending, store the handlers
                this.callbacks.push({
                    onFulfilled: handleFulfilled,
                    onRejected: handleRejected,
                });
            }
        });
    }

    // catch() function
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

// Promise.all(promiseArr)
CustomPromise.all = function (promises) {
    return new CustomPromise((resolve, reject) => {
        let resolvedValues = [];
        let remaining = promises.length;

        promises.forEach((promise, index) => {
            CustomPromise.resolve(promise)
                .then((value) => {
                    resolvedValues[index] = value;
                    remaining--;

                    // If all promises are resolved, resolve the returned promise
                    if (remaining === 0) {
                        resolve(resolvedValues);
                    }
                })
                .catch(reject); // If any promise fails, reject immediately
        });
    });
};

// Promise.race(promiseArr)
CustomPromise.race = function (promises) {
    return new CustomPromise((resolve, reject) => {
        promises.forEach((promise) => {
            CustomPromise.resolve(promise).then(resolve).catch(reject);
        });
    });
};
