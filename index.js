// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// const wait = (ms) =>
//   new Promise((resolve) => setTimeout(() => resolve(ms), ms));

// const retryWithDelay = async (
//   asyncFn,
//   retries = 3,
//   delay = 50,
//   finalError = 'Failed'
// ) => {
//   try {
//     await asyncFn();
//   } catch (err) {
//     if (retries <= 0) {
//       return Promise.reject(finalError);
//     }

//     await wait(delay);

//     return retryWithDelay(asyncFn, retries - 1, delay, finalError);
//   }
// };

// const getTestFunc = () => {
//   let callCounter = 0;
//   return async () => {
//     callCounter++;
//     if (callCounter < 5) {
//       throw new Error('Not yet');
//     }
//   };
// };

// const test = async () => {
//   await retryWithDelay(getTestFunc(), 10);
//   console.log('success');
//   await retryWithDelay(getTestFunc(), 3);
//   console.log('will fail before getting here');
// };

// test().catch(console.error);

// Implement a stack using a single queue.

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(x) {
    this.items.push(x);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  rear() {
    return this.items[items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// const queue1 = new Queue();

// queue1.enqueue(10);
// queue1.enqueue(20);
// queue1.enqueue(30);
// console.log(queue1);

// element, priority

function linkedList() {
  let Node = function (ele) {
    this.element = ele;
    this.next = null;
  };

  let length = 0;
  let head = null;

  this.append = function (ele) {
    let node = new Node(ele),
      current;

    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      length++;
    }
  };

  this.removeAt = function (pos) {
    if (pos < 0 || pos > length) return null;
    let current = head,
      previous,
      index = 0;
    if (pos === 0) {
      head = head.next;
    } else {
      while (index++ < pos) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }

    current.next = null;
    length--;
    return current.element;
  };

  this.insertAt = function (pos, ele) {
    if (pos < 0 || pos > length) return null;
    let current = head,
      previous,
      index = 0;

    let node = new Node(ele);

    if (pos === 0) {
      node.next = head;
      head = node;
    } else {
      while (index++ < pos) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
    length++;
    return true;
  };

  this.toString = function () {
    let current = head;
    let string = '';
    while (current) {
      string += current.element + (current.next ? '/n' : '');
      current = current.next;
    }
    return string;
  };

  this.toArray = function () {
    let current = head;
    const arr = [];

    while (current) {
      arr.push(current.element);
      current = current.next;
    }

    return arr;
  };

  this.getIndexOf = function (ele) {
    console.log('get index of', ele);
    let current = head,
      index = 0;
    console.log(current);
    console.log(length);

    while (current) {
      if (current.element === ele) {
        return ++index;
      }
      current = current.next;
      index++;
    }

    return -1;
  };

  this.delete = function (ele) {
    return this.removeAt(this.getIndexOf(ele));
  };

  this.deleteHead = function () {
    let current = head;
    if (current === null) {
      return true;
    }

    if (current.next) {
      current = current.next;
      head = current;
    } else {
      head = null;
    }
    return true;
  };

  this.deleteTail = function () {
    let current = head,
      previous;
    while (current.next) {
      previous = current;
      current = current.next;
    }

    previous.next = null;
    return current.element;
  };

  this.isPresent = function (ele) {
    return this.getIndexOf(ele) !== -1;
  };

  this.size = function () {
    return length;
  };

  this.getHead = function () {
    return head;
  };
}
let ll = new linkedList();
ll.append('prashant');
ll.append('anil');
ll.append('29');
console.log(ll.getIndexOf('29'));
ll.insertAt(2, 'three');
console.log(ll.toArray());

//Remove 'anil' from the list
ll.removeAt(1);
console.log(ll.toArray());

//Remove the first element from the list
ll.deleteHead();
console.log(ll.toArray());
// console.log(ll.isPresent('threee'));
