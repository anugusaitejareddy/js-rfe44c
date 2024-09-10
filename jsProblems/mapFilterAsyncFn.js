/*
IMPLEMENT ASYNC FILTER FUNCTION

Implement a function that takes an array of input and an async iteratee function and returns a promise that resolves with the list of inputs that has passed the test through the iteratee function.

The inputs will run in parallel, but the output will be in the same order as the original.

The asynchronous iteratee function will accept an input and a
callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.

Input:
let numPromise = filter([1, 2, 3, 4, 5], function (num, callback) {
setTimeout(function () {
num = num * 2;
console.log(num);
// throw error
if(num === 7){
callback(true);
}else{
callback(null, num !== 4);
}
}, 2000);
});
numPromise
.then((result) => console.log("success:" + result))
.catch(() => console.log("no success"));

Output:
2
4
6
8
10
"success:1,3,4,5"
*/

const filter = (arr, fn) => {
  return new Promise((resolve, reject) => {
    const filteredArr = [];
    let iterateCount = 0;
    arr.forEach((e) => {
      fn(e, (error, result) => {
        /*
        increment the iterateCount inside the callback so that promise gets resolved after the complete iteration of array. 
        */
        iterateCount++;
        if (error) {
          reject(error);
        }
        if (result) {
          filteredArr.push(e);
        }
        if (iterateCount === arr.length) {
          resolve(filteredArr);
        }
      });
    });
  });
};

let numPromise = filter([1, 2, 3, 4, 5], function (num, callback) {
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

numPromise
  .then((val) => {
    console.log('success', val);
  })
  .catch((err) => console.log(err));
