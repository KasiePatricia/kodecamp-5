

//Step 4: Connecting Private Variables with Prototype Methods

// Question : Now you need to solve the challenge from Step 3.2.
// Task 4.1: Modify your factory function so that each counter instance can access its own private count variable. You'll need to override the prototype methods for each instance.
// Task 4.2: Implement these methods:
// increment() - should increase the private count and return the new value
// decrement() - should decrease the private count and return the new value
// getValue() - should return the current private count
// reset() - should reset count to the original initial value
// Task 4.3: Test that two different counter instances don't interfere with each other.

//Task 4.1 & 4.2: Enhanced Factory Implementation

const createCounter = (initialValue = 0) => {

  let count = initialValue;
  const initialCount = initialValue;

  const counter = Object.create(CounterPrototype);

  // Override prototype methods with instance-specific implementations
  counter.increment = () => {
    count++;
    return count;
  };

  counter.decrement = () => {
    count--;
    return count;
  };

  counter.getValue = () => {
    return count;
  };

  counter.reset = () => {
    count = initialCount;
    return count;
  };

  return counter;
}


//Task 4.3: Testing Counter Isolation
// Test case 1: Basic functionality

const counter1 = createCounter(5);
console.log(counter1.getValue());
console.log(counter1.increment());
console.log(counter1.increment());
console.log(counter1.decrement());
console.log(counter1.reset());

// Test case 2: Instance isolation
const counterA = createCounter(0);
const counterB = createCounter(100);

counterA.increment();
counterA.increment();
counterB.decrement();

console.log(counterA.getValue());
console.log(counterB.getValue());

counterA.reset();
console.log(counterA.getValue());
console.log(counterB.getValue()); // Should remain 99