# Counter Factory Function Implementation

### Learning Objectives
By the end of this task, you will understand:

- Closures and private variables
- Prototypal inheritance
- Higher-order functions
- Immutability principles
- ES6 features (arrow functions, const/let, destructuring)

## Step 1: Understanding the Requirements

## Question: Your goal is to create a factory function that creates counter objects with the following features:
Each counter should have private state (count value)
Multiple counters should not interfere with each other
All counters should share common methods through prototypal inheritance
The implementation should use ES6 features
Expected Usage:
const counter1 = createCounter(0);
const counter2 = createCounter(10);

 
counter1.increment(); // Should not affect counter2
console.log(counter1.getValue()); // 1
console.log(counter2.getValue()); // 10

### Task 1.1: Main Implementation Challenges

Looking at this counter factory function requirement, I think these will be the biggest challenges:

1. **Private State Management**:
   - Based on research JavaScript doesn't have true private properties in objects (pre-ES13)
   - Need to find a way to keep the count value private while still allowing methods to access it

2. **Prototypal Inheritance Setup**:
   - Creating shared methods that can access instance-specific private data
   - Ensuring methods on the prototype can interact with each counter's private state

3. **ES6 Feature Utilization**:
   - Implementing destructuring for configuration objects
   - Leveraging template literals, default parameters, and object shorthand

4. **Isolation Between Counters**:
   - Ensuring no shared state between different counter instances
   - Preventing methods from accidentally modifying the wrong counter's state

5. **Method Implementation**:
   - Creating increment/decrement functionality that properly modifies the private state
   - Implementing getValue() to return the current state without exposing the private variable

The biggest challenge will likely be maintaining true privacy of the count value while still allowing shared methods to access and modify it through prototypal inheritance.


## Step 2: Create the Counter Prototype
### Task 2.2: Why Use Prototypal Inheritance? -- Main Implementation Challenges
### Question: Explain why we're creating a prototype first instead of putting methods directly in each counter instance

We're creating a prototype first instead of putting methods directly in each counter instance for several important reasons:
1. **Memory Efficiency**
2. **Performance**
3. **Maintainability**
4. **Consistency**
5. **Proper JavaScript Patterns**
6. **Future Extensibility**

1. **Memory Efficiency**:
   - When methods are defined on each instance, every new counter creates new function objects in memory
   - With prototypal inheritance, all instances share the same method references from the prototype

2. **Performance**:
   - JavaScript engines optimize prototype lookups
   - Creating new functions for each instance adds unnecessary overhead

3. **Maintainability**:
   - Changes to methods only need to be made in one place (the prototype)
   - If methods were instance-specific, updating them would require modifying every instance

4. **Consistency**:
   - Ensures all counters behave exactly the same way
   - Prevents accidental modifications to individual instances' methods

5. **Proper JavaScript Patterns**:
   - Follows JavaScript's native prototypal inheritance model
   - Matches how built-in objects (like Arrays and Objects) work in JavaScript

6. **Future Extensibility**:
   - Easier to add new methods later that will automatically be available to all instances
   - Simpler inheritance chain if we need to create specialized counters later


## Step 3: Implement Basic Factory Function with Closures
### Task 3.2: After creating two counters, should they share the same count variable or have separate ones? Why?

**Answer**: Each counter instance should have **separate** count variables, not shared ones. 
Here's why:

1. **Instance Isolation**: Each counter represents an independent entity. If `counter1` and `counter2` shared the same count variable, incrementing `counter1` would also affect `counter2`, which violates the principle of object independence.

2. **Closure Scope**: Each call to `createCounter()` creates a new execution context with its own closure scope. The `count` variable exists within this scope and is unique to each function call.

3. **Expected Behavior**: Users expect each counter to maintain its own state. For example:
   ```javascript
   const counter1 = createCounter(0);
   const counter2 = createCounter(10);
   
   counter1.increment(); // Should make counter1 = 1, counter2 should still be 10
   console.log(counter1.getValue()); // Expected: 1
   console.log(counter2.getValue()); // Expected: 10 (unchanged)
   ```

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


// Task 6.3: Comparing mutable vs immutable
//Answer: counter.increment() modifies the original counter while counter.add(1) creates a new counter instance.