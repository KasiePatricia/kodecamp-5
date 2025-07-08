//Step 1
// const createCounter = (countValue) => {
//   let value = countValue;


// }

// const counter1 = createCounter(0);
// const counter2 = createCounter(10);

// counter1.increment();
// console.log(counter1.getValue());
// console.log(counter2.getValue());


//Step 2
//Task 2.1: CounterPrototype Implementation

// Question: Create a prototype object that will be shared by all counter instances.
// Task 2.1: Create a CounterPrototype object with the following methods:
// increment() - increases count by 1
// decrement() - decreases count by 1
// getValue() - returns current count value
// reset() - resets count to initial value
// Hint: At this stage, you can leave the methods empty or throw "Not implemented" errors.

const CounterPrototype = {
  increment() {
    throw new Error("Not implemented");
  },

  decrement() {
    throw new Error("Not implemented");
  },

  getValue() {
    throw new Error("Not implemented");
  },

  reset() {
    throw new Error("Not implemented");
  }
}