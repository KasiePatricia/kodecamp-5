// Step 6: Implement Immutability

//Question:
// Add methods that don't modify the existing counter but return new counter instances.
// Task 6.1: Add these immutable methods:
// add(value) - returns a new counter with count + value
// subtract(value) - returns a new counter with count - value
// multiply(value) - returns a new counter with count * value
// Task 6.2: Add a snapshot() method that returns a new counter with the same current count.
// Task 6.3: Test that the original counter is unchanged after calling these methods.
// Question: What's the difference between counter.increment() and counter.add(1)?

const CounterPrototype = require('./task-1-2-counter-function.js');

function createCounter(initialValue = 0) {
  let count = initialValue;
  const originalInitialValue = initialValue;
  let changeCallback = null;
  
  const counter = Object.create(CounterPrototype);
  
  // Mutable methods (modify existing counter)
  counter.increment = function() {
    count++;
    if (changeCallback) changeCallback(count, 'increment');
    return count;
  };
  
  counter.decrement = function() {
    count--;
    if (changeCallback) changeCallback(count, 'decrement');
    return count;
  };
  
  counter.getValue = function() {
    return count;
  };
  
  counter.reset = function() {
    count = originalInitialValue;
    if (changeCallback) changeCallback(count, 'reset');
    return count;
  };
  
  // Higher-order functions from Step 5
  counter.transform = function(transformFn) {
    count = transformFn(count);
    if (changeCallback) changeCallback(count, 'transform');
    return count;
  };
  
  counter.onChange = function(callback) {
    changeCallback = callback;
    return counter;
  };
  
  // Task 6.1: Immutable methods (return new counter instances)
  counter.add = function(value) {
    return createCounter(count + value);
  };
  
  counter.subtract = function(value) {
    return createCounter(count - value);
  };
  
  counter.multiply = function(value) {
    return createCounter(count * value);
  };
  
  // Task 6.2: Snapshot method
  counter.snapshot = function() {
    return createCounter(count);
  };
  
  return counter;
}

const counter = createCounter(10);

// Task 6.1: Testing immutable methods
const added = counter.add(5);
console.log("  counter:", counter.getValue()); // Still 10
console.log("  New counter:", added.getValue()); // 15

const subtracted = counter.subtract(3);
console.log("  counter:", counter.getValue()); // Still 10
console.log("  New counter:", subtracted.getValue()); // 7

const multiplied = counter.multiply(2);
console.log("  counter:", counter.getValue()); // Still 10
console.log("  New counter:", multiplied.getValue()); // 20

// Task 6.2: Testing snapshot
counter.increment(); // counter is now 11
const snapshot = counter.snapshot();
counter.increment(); // counter is now 12

console.log("Counter after increments:", counter.getValue()); // 12
console.log("Snapshot value:", snapshot.getValue()); // 11

// Task 6.3: Comparing mutable vs immutable
//Answer: counter.increment() modifies the original counter while counter.add(1) creates a new counter instance.
