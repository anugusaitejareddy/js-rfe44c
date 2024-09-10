/*
Implement a function that takes a list of async functions as input and executes them in a series that is one at a time. The next task is executed only when the previous task is completed
*/

const createAsyncTask = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, num * 1000);
  });
};

// const asyncSeriesExecuter = async function (promises) {
//   for (let promise of promises) {
//     try {
//       const val = await promise;
//       console.log(val);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const asyncSeriesExecuter = function (promises) {
//   const promise = promises.shift();
//   promise.then((val) => {
//     console.log(val);
//     if (promises.length > 0) {
//       asyncSeriesExecuter(promises);
//     }
//   });
// };

const asyncSeriesExecuter = function (promises) {
  promises.reduce((acc, curr) => {
    const nextPromise = acc.then(() => {
      return curr.then((val) => console.log(val));
    });
    return nextPromise;
  }, Promise.resolve());
};

asyncSeriesExecuter([
  createAsyncTask(1),
  createAsyncTask(2),
  createAsyncTask(3),
  createAsyncTask(4),
  createAsyncTask(5),
]);
