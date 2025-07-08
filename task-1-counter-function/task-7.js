// Step 7: Enhance with ES6 Features

// Refactor your code to use more ES6 features.
// Task 7.1: Use these ES6 features in your implementation:
// Arrow functions for methods
// Destructuring in function parameters
// Default parameters
// Template literals
// Object method shorthand
// const/let instead of var
// Task 7.2: Add a batch(operations) method that accepts an object with destructuring:
// counter.batch({ increments: 3, decrements: 1 });

// Task 7.3: Add a toString() method that uses template literals to return a formatted string.

const CounterPrototype = require('./task-1-2-counter-function.js');

 // Using arrow functions
const createCounter = (initialValue = 0) => {
  let count = initialValue;
  const originalInitialValue = initialValue;
  let changeCallback = null;
  
  const counter = Object.create(CounterPrototype);
  
  counter.increment = () => {
    count++;
    if (changeCallback) changeCallback(count, 'increment');
    return count;
  };
  
  counter.decrement = () => {
    count--;
    if (changeCallback) changeCallback(count, 'decrement');
    return count;
  };
  
  counter.getValue = () => count;
  
  counter.reset = () => {
    count = originalInitialValue;
    if (changeCallback) changeCallback(count, 'reset');
    return count;
  };
  
  counter.transform = (transformFn) => {
    count = transformFn(count);
    if (changeCallback) changeCallback(count, 'transform');
    return count;
  };
  
  counter.onChange = (callback) => {
    changeCallback = callback;
    return counter;
  };
  
  // Immutable methods with arrow functions
  counter.add = (value) => createCounter(count + value);
  counter.subtract = (value) => createCounter(count - value);
  counter.multiply = (value) => createCounter(count * value);
  counter.snapshot = () => createCounter(count);
  
  // Task 7.2: batch method with destructuring
  counter.batch = ({ increments = 0, decrements = 0 } = {}) => {  // Destructuring + defaults
    for (let i = 0; i < increments; i++) {
      counter.increment();
    }
    for (let i = 0; i < decrements; i++) {
      counter.decrement();
    }
    return counter;
  };
  
  // Task 7.3: toString method with template literals
  counter.toString = () => {
    const status = count >= 0 ? 'positive' : 'negative';
    return `Counter[value: ${count}, initial: ${originalInitialValue}, status: ${status}]`;
  };
  
  return counter;
};

// const counter = createCounter(10);
const counter1 = createCounter();  // Uses default value 0
const counter2 = createCounter(5);

// Using destructuring in batch operations
counter2.batch({ increments: 3, decrements: 1 });
console.log("After batch({increments: 3, decrements: 1}):", counter2.getValue());

console.log(counter1.toString()); // Counter[value: 2, initial: 0, status: positive]