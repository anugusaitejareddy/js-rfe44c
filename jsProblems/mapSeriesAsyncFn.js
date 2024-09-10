const mapSeries = (arr, fn) => {
  return new Promise((resolve, reject) => {
    const final = arr.reduce((acc, curr) => {
      const nextPromise = acc.then((val) => {
        return new Promise((resolve, reject) => {
          fn(curr, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve([...val, result]);
            }
          });
        });
      });
      return nextPromise;
    }, Promise.resolve([]));
    final.then((val) => resolve(val)).catch((err) => reject(err));
  });
};

let numSeries = mapSeries([1, 2, 3, 4, 5], function (num, callback) {
  num *= 2;
  setTimeout(() => {
    console.log(num);
    if (num > 12) {
      callback(true);
    } else {
      callback(null, num);
    }
  }, 1000);
});

numSeries
  .then((val) => console.log('success', val))
  .catch((err) => console.log('no success', err));
