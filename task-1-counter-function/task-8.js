// Step 8: Create Advanced Counter Factory

// Task 8.1: Create a createAdvancedCounter(config) function that accepts a configuration object with:
// initialValue (default: 0)
// step (default: 1) - how much to increment/decrement by
// min (default: -Infinity) - minimum allowed value
// max (default: Infinity) - maximum allowed value
// Task 8.2: Ensure the counter respects the min/max boundaries.
// Task 8.3: Add a getConfig() method that returns the current configuration.

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
  
  // Task 8.2: Modified methods that respect boundaries
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
  
  // Task 8.3: getConfig method
  counter.getConfig = () => ({
    ...counterConfig,
    currentValue: count
  });
  
  return counter;
};

// Task 8.1: Testing configuration options
const basicCounter = createAdvancedCounter();
console.log("Basic counter:", basicCounter.toString());

const customCounter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10
});
console.log("Custom counter:", customCounter.toString());

// Task 8.2: Testing boundary enforcement
console.log("Initial value:", customCounter.getValue()); // 5

// Test increment with boundaries
customCounter.increment();
console.log("After increment:", customCounter.getValue()); // 7

// Task 8.3: Testing getConfig method
const configCounter = createAdvancedCounter({
  initialValue: 10,
  step: 5,
  min: -10,
  max: 50
});

console.log("Configuration:", configCounter.getConfig());