/*
Create a pausable auto incrementor in JavaScript, which takes an initial value and steps as input and increments the initial value with given steps every second. The incrementer can be paused and resumed back.
*/

const timer = (initial = 0, step = 1) => {
  let intervalId;

  const startTimer = () => {
    intervalId = setInterval(() => {
      console.log(initial);
      initial += step;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  return {
    startTimer,
    stopTimer,
  };
};

const timerObj = timer(1, 1);

timerObj.startTimer();

setTimeout(() => {
  timerObj.stopTimer();
}, 5000);

setTimeout(() => {
  timerObj.startTimer();
}, 10 * 1000);
