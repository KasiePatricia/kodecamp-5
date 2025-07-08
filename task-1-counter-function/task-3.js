//Step 3
//Task 3.1: Implement Basic Factory Function with Closures

//Question 
// Create the factory function that uses closures to maintain private state.
// Task 3.1: Write a createCounter(initialValue = 0) function that:
// Creates a private count variable
// Creates a counter object that inherits from CounterPrototype
// Returns the counter object


const createCounter1 = (initialValue = 0) => {
  let count = initialValue;

  //Creates a private count variable
  const counter = Object.create(CounterPrototype);

  return counter;
}