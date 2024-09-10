/*
Given a list of promises and their priorities, call them parallelly and resolve with the value of the first promise with the most priority. If all the promises fail then reject with a custom error.
*/

function resolvePromisesWithPriority(promises) {
  promises = promises.sort((a, b) => a.priority - b.priority);
  const rejected = {};
  const result = {};
  let completedTasks = 0;
  let mostPriority = 0;

  return new Promise((resolve, reject) => {
    promises.forEach(({ task, priority }) => {
      task
        .then((value) => {
          result[priority] = value;
          if (mostPriority < priority) {
            mostPriority = priority;
          }
        })
        .catch(() => {
          rejected[priority] = true;
        })
        .finally(() => {
          completedTasks++;
          if (completedTasks === promises.length) {
            if (mostPriority > 0) {
              resolve(mostPriority);
            } else {
              reject('All tasks failed');
            }
          }
        });
    });
  });
}

function createAsyncTask(willResolve) {
  let randomNum = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willResolve) {
        resolve();
      } else {
        reject();
      }
    }, randomNum * 1000);
  });
}

const promises = [
  { task: createAsyncTask(true), priority: 9 },
  { task: createAsyncTask(true), priority: 4 },
  { task: createAsyncTask(true), priority: 3 },
  { task: createAsyncTask(true), priority: 2 },
];

resolvePromisesWithPriority(promises)
  .then((priority) => console.log('priorty', priority))
  .catch((err) => console.log(err));
