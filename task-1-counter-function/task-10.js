// Step 10: Extension Challenges

// 👉🏽 Choose one, at most two of these advanced challenges:
// Challenge 10.1: Add a history feature that tracks all operations performed on the counter.
// Challenge 10.2: Implement counter serialization - methods to convert counter state to JSON and recreate from JSON.
// Challenge 10.3: Create a counter that has a maximum number of operations (after which it becomes read-only).
// Challenge 10.4: Implement validation functions that can prevent certain operations based on custom rules.
// Challenge 10.5: Create a way to compose multiple counters (e.g., a counter that represents the sum of other counters).

//I'm choosing chanllange 10.1 and 10.2

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
  const history = [];

  const counter = Object.create(CounterPrototype);
  const clampValue = (value) => Math.max(min, Math.min(max, value));

  const logOperation = (operation, before, after) => {
    history.push({
      operation,
      before,
      after,
      timestamp: new Date().toISOString()
    });
  };

  counter.increment = () => {
    const before = count;
    const newValue = clampValue(count + step);
    count = newValue;
    logOperation('increment', before, newValue);
    if (changeCallback) changeCallback(count, 'increment');
    return count;
  };

  counter.decrement = () => {
    const before = count;
    const newValue = clampValue(count - step);
    count = newValue;
    logOperation('decrement', before, newValue);
    if (changeCallback) changeCallback(count, 'decrement');
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    const before = count;
    count = clampValue(originalInitialValue);
    logOperation('reset', before, count);
    if (changeCallback) changeCallback(count, 'reset');
    return count;
  };

  counter.transform = (transformFn) => {
    const before = count;
    const newValue = clampValue(transformFn(count));
    count = newValue;
    logOperation('transform', before, newValue);
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
    for (let i = 0; i < increments; i++) counter.increment();
    for (let i = 0; i < decrements; i++) counter.decrement();
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

  counter.getHistory = () => [...history];

  counter.toJSON = () => JSON.stringify({
    config: counterConfig,
    count,
    history
  });

  return counter;
};

const createCounterFromJSON = (jsonString) => {
  const parsed = JSON.parse(jsonString);
  const { config, count, history = [] } = parsed;

  const counter = createAdvancedCounter({ ...config, initialValue: count });

  // Override getHistory to return restored history
  counter.getHistory = () => [...history];

  return counter;
};


const counter = createAdvancedCounter({ initialValue: 5 });
counter.increment(); // 6
counter.decrement(); // 5
counter.transform(x => x * 2); // 10

console.log(counter.getHistory());

const json = counter.toJSON();

const restored = createCounterFromJSON(json);
console.log(restored.getValue()); // 10
console.log(restored.getHistory()); // Same history