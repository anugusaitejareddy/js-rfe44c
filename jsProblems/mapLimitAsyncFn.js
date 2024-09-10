/*
Implement a mapLimit function that is similar to the Array.map() but returns a promise that resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs.

It also accepts a limit to decide how many operations can
occur at a time.

The asynchronous iteratee function will accept an input and a
callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.
*/

function chop(arr, limit) {
  let res = [];
  let subArray = [];
  for (let i = 0; i < arr.length; i++) {
    subArray.push(arr[i]);
    if (subArray.length === limit) {
      res.push(subArray);
      subArray = [];
    }
  }

  if (subArray.length > 0) res.push(subArray);
  return res;
}

const choppedArr = chop([1, 2, 3, 4, 5, 6, 7, 8, 54, 54], 5);
console.log(choppedArr);

const mapLimit = (arr, limit, fn) => {
  return new Promise((resolve, reject) => {
    const chopArr = chop(arr, limit);
    const final = chopArr.reduce((acc, curr) => {
      const nextPromise = acc.then((val) => {
        return new Promise((resolve, reject) => {
          const results = [];
          let taskCompleted = 0;
          curr.forEach((e) => {
            fn(e, (error, value) => {
              if (error) {
                reject(error);
              } else {
                results.push(value);
              }
              taskCompleted++;
              if (taskCompleted >= curr.length) {
                resolve([...val, ...results]);
              }
            });
          });
        });
      });
      return nextPromise;
    }, Promise.resolve([]));
    final.then((result) => resolve(result)).catch((err) => reject(err));
  });
};

let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  num *= 2;
  setTimeout(() => {
    console.log(num);
    if (num > 12) {
      callback(true);
    } else {
      callback(null, num);
    }
  }, num * 1000);
});

numPromise
  .then((val) => console.log('success', val))
  .catch((err) => console.log(err));
