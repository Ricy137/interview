class CustomPromise {
   constructor(executor) {
       // Initial state
       this.state = 'pending'; // Can be 'pending', 'fulfilled', or 'rejected'
       this.value = undefined;
       this.callbacks = []; // To handle then/catch chaining

       // Resolve function
       const resolve = (value) => {
           if (this.state !== 'pending') return;
           this.state = 'fulfilled';
           this.value = value;

           // Call all stored success handlers
           this.callbacks.forEach(callback => callback.onFulfilled(value));
       };

       // Reject function
       const reject = (reason) => {
           if (this.state !== 'pending') return;
           this.state = 'rejected';
           this.value = reason;

           // Call all stored failure handlers
           this.callbacks.forEach(callback => callback.onRejected(reason));
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
           if (this.state === 'fulfilled') {
               handleFulfilled(this.value);
           } else if (this.state === 'rejected') {
               handleRejected(this.value);
           } else {
               // If the promise is still pending, store the handlers
               this.callbacks.push({ onFulfilled: handleFulfilled, onRejected: handleRejected });
           }
       });
   }

   // catch() function
   catch(onRejected) {
       return this.then(null, onRejected);
   }
}

// Example usage:
const myPromise = new CustomPromise((resolve, reject) => {
   setTimeout(() => resolve("Success!"), 1000);
});

myPromise.then(value => console.log(value)); // Output: "Success!" after 1 second