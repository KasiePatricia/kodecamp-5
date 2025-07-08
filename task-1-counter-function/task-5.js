// Step 5: Add Higher-Order Functions

// Question:
// Higher-order functions either accept functions as parameters or return functions.

// Task 5.1: Add a transform(transformFn) method that:
// Takes a function as a parameter
// Applies that function to the current count
// Updates the count with the result
// Returns the new count
// Example usage:
// counter.transform(x => x * 2); // Doubles the count
// counter.transform(x => Math.max(x, 0)); // Ensures count is not negative

 
// Task 5.2: Add a createPredicate() method that:
// Returns a function
// The returned function should take a threshold parameter
// The returned function should return true if current count >= threshold
// Example usage:
// const isAboveThreshold = counter.createPredicate();
// console.log(isAboveThreshold(5)); // true if count >= 5

 
// Task 5.3: Add an onChange(callback) method that:
// Takes a callback function as parameter
// Modifies increment/decrement to call the callback after changing the count
// The callback should receive the new value and the operation type
// Should return the counter for method chaining

const CounterPrototype = require('./task-1-2-counter-function.js');

function createCounter(initialValue = 0) {
  // Private variables
  let count = initialValue;
  const originalInitialValue = initialValue;
  let changeCallback = null;
  
  const counter = Object.create(CounterPrototype);
  
  // Override prototype methods to access private variables
  counter.increment = function() {
    count++;
    if (changeCallback) {
      changeCallback(count, 'increment');
    }
    return count;
  };
  
  counter.decrement = function() {
    count--;
    if (changeCallback) {
      changeCallback(count, 'decrement');
    }
    return count;
  };
  
  counter.getValue = function() {
    return count;
  };
  
  counter.reset = function() {
    count = originalInitialValue;
    if (changeCallback) {
      changeCallback(count, 'reset');
    }
    return count;
  };
  
  // Task 5.1: Add transform method (higher-order function)
  counter.transform = function(transformFn) {
    count = transformFn(count);
    if (changeCallback) {
      changeCallback(count, 'transform');
    }
    return count;
  };
  
  // Task 5.2: Add createPredicate method (returns a function)
  counter.createPredicate = function() {
    return function(threshold) {
      return count >= threshold;
    };
  };
  
  // Task 5.3: Add onChange method (accepts callback function)
  counter.onChange = function(callback) {
    changeCallback = callback;
    return counter;
  };
  
  return counter;
}

// Create counters
const counter1 = createCounter(5);
const counter2 = createCounter(10);

// Task 5.1: Testing transform method
console.log("counter1 initial value:", counter1.getValue()); // 5
console.log("counter1.transform(x => x * 2):", counter1.transform(x => x * 2)); // 10
console.log("counter1.transform(x => Math.max(x, 0)):", counter1.transform(x => Math.max(x, 0))); // 10

// Task 5.2: Testing createPredicate method
counter2.increment(); // counter2 is now 11
const isAboveThreshold = counter2.createPredicate();
console.log("counter2 value:", counter2.getValue()); // 11
console.log("isAboveThreshold(5):", isAboveThreshold(5)); // true
console.log("isAboveThreshold(15):", isAboveThreshold(15)); // false

// Task 5.3: Testing onChange method
const counter3 = createCounter(0);

// Set up onChange callback
counter3.onChange((newValue, operation) => {
  console.log(`Operation: ${operation}, New value: ${newValue}`);
});

counter3.increment(); // Operation: increment, New value: 1
counter3.increment(); // Operation: increment, New value: 2
counter3.decrement(); // Operation: decrement, New value: 1
counter3.transform(x => x * 5); // Operation: transform, New value: 5
counter3.reset(); // Operation: reset, New value: 0