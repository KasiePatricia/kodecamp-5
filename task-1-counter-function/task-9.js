// Step 9: Testing and Validation

// Task 9.1: Write test cases to verify:
// Basic increment/decrement functionality
// Private state isolation between counters
// Higher-order functions work correctly
// Immutable methods don't modify original counter
// Advanced counter respects boundaries
// Task 9.2: Create examples showing:
// Two counters working independently
// Using transform with different functions
// Chaining operations with onChange
// Creating new counters with immutable methods

const CounterPrototype = require('./task-1-2-counter-function.js');

const createAdvancedCounter = (config = {}) => {
  const {
    initialValue = 0,
    step = 1,
    min = -Infinity,
    max = Infinity
  } = config;
  
  let count = initialValue;
  const originalInitialValue = initialValue;
  let changeCallback = null;
  const counterConfig = { initialValue, step, min, max };
  const counter = Object.create(CounterPrototype);
  
  const clampValue = (value) => Math.max(min, Math.min(max, value));
  
  counter.increment = () => {
    const newValue = clampValue(count + step);
    count = newValue;
    if (changeCallback) changeCallback(count, 'increment');
    return count;
  };
  
  counter.decrement = () => {
    const newValue = clampValue(count - step);
    count = newValue;
    if (changeCallback) changeCallback(count, 'decrement');
    return count;
  };
  
  counter.getValue = () => count;
  
  counter.reset = () => {
    count = clampValue(originalInitialValue);
    if (changeCallback) changeCallback(count, 'reset');
    return count;
  };
  
  counter.transform = (transformFn) => {
    const newValue = clampValue(transformFn(count));
    count = newValue;
    if (changeCallback) changeCallback(count, 'transform');
    return count;
  };
  
  counter.onChange = (callback) => {
    changeCallback = callback;
    return counter;
  };
  
  counter.add = (value) => createAdvancedCounter({
    ...counterConfig,
    initialValue: clampValue(count + value)
  });
  
  counter.subtract = (value) => createAdvancedCounter({
    ...counterConfig,
    initialValue: clampValue(count - value)
  });
  
  counter.multiply = (value) => createAdvancedCounter({
    ...counterConfig,
    initialValue: clampValue(count * value)
  });
  
  counter.snapshot = () => createAdvancedCounter({
    ...counterConfig,
    initialValue: count
  });
  
  counter.batch = ({ increments = 0, decrements = 0 } = {}) => {
    for (let i = 0; i < increments; i++) {
      counter.increment();
    }
    for (let i = 0; i < decrements; i++) {
      counter.decrement();
    }
    return counter;
  };
  
  counter.toString = () => {
    const status = count >= 0 ? 'positive' : 'negative';
    const atMin = count === min && min !== -Infinity;
    const atMax = count === max && max !== Infinity;
    const boundary = atMin ? ' (at minimum)' : atMax ? ' (at maximum)' : '';
    return `AdvancedCounter[value: ${count}, step: ${step}, range: ${min === -Infinity ? '-∞' : min} to ${max === Infinity ? '∞' : max}, status: ${status}${boundary}]`;
  };
  
  counter.getConfig = () => ({
    ...counterConfig,
    currentValue: count
  });
  
  return counter;
};

//Task 9.1: Write Test Cases

// Test 1: Basic increment/decrement functionality
const counter1 = createAdvancedCounter({ initialValue: 0, step: 2 });
console.assert(counter1.increment() === 2, 'Test 1.1 Failed');
console.assert(counter1.increment() === 4, 'Test 1.2 Failed');
console.assert(counter1.decrement() === 2, 'Test 1.3 Failed');

// Test 2: Private state isolation
const counter2 = createAdvancedCounter({ initialValue: 10 });
counter1.increment();
console.assert(counter1.getValue() !== counter2.getValue(), 'Test 2 Failed');

// Test 3: Higher-order transform
counter1.transform(x => x * 3); // count was 4
console.assert(counter1.getValue() === 12, 'Test 3 Failed');

// Test 4: Immutable add/subtract/multiply
const counter3 = counter1.add(10);
console.assert(counter3.getValue() === 22, 'Test 4.1 Failed');
console.assert(counter1.getValue() === 12, 'Test 4.2 Failed'); // original unchanged

// Test 5: Boundaries respected
const boundedCounter = createAdvancedCounter({ initialValue: 9, step: 5, min: 0, max: 10 });
boundedCounter.increment(); // would be 14, but max is 10
console.assert(boundedCounter.getValue() === 10, 'Test 5.1 Failed');
boundedCounter.decrement(); // should go to 5
boundedCounter.decrement(); // should go to 0
boundedCounter.decrement(); // should stay at 0
console.assert(boundedCounter.getValue() === 0, 'Test 5.2 Failed');

console.log("All tests passed");

//Task 9.2: Examples
//Test1: Two counters working independently
const counter4 = createAdvancedCounter({ initialValue: 5 });
const counter5 = createAdvancedCounter({ initialValue: 100 });

counter4.increment(); // 6
counter5.decrement(); // 99
console.log(counter4.getValue()); // 6
console.log(counter5.getValue()); // 99

//Test 2: Using transform with different functions
const transformFxn = createAdvancedCounter({ initialValue: 3 });
transformFxn.transform(x => x * 10); // 30
transformFxn.transform(x => Math.max(x, 5)); // 30
console.log(v.getValue()); // 30

//Test 3: Chaining operations with onChange
const chainingOnChange = createAdvancedCounter({ initialValue: 0 });

chainingOnChange.onChange((newValue, type) => {
  console.log(`Operation: ${type}, New Value: ${newValue}`);
});

chainingOnChange.increment(); //Operation: increment, New Value: 1
chainingOnChange.decrement(); //Operation: decrement, New Value: 0

//Test 4: Creating new counters with immutable methods
const base = createAdvancedCounter({ initialValue: 10 });

const added = base.add(5);
console.log(added.getValue()); // 15
console.log(base.getValue());  // 10

const snapshot = base.snapshot();
console.log(snapshot.getValue()); // 10

