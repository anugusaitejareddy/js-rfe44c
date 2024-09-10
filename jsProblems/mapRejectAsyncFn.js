/*
Implement a function that takes an array of input and an async iteratee function and returns a promise that resolves with the list of inputs that has failed the test through the iteratee function. This function is exactly the opposite of the Async Filter.

The inputs will run in parallel, but the output will be in the same order as the original.

The asynchronous iteratee function will accept an input and a
callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.
*/

const reject = (arr, fn) => {
  return new Promise((resolve, reject) => {
    const output = [];
    arr.forEach((e, index) => {
      fn(e, (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          output.push(e);
        }
        if (arr.length === index + 1) {
          resolve(output);
        }
      });
    });
  });
};

let numPromise = reject([1, 2, 3, 4, 5], function (num, callback) {
  num *= 2;
  setTimeout(() => {
    console.log(num);
    if (num === 7) {
      callback(true);
    } else {
      callback(null, num !== 4);
    }
  }, num * 1000);
});

numPromise.then((val) => console.log('success', val));
