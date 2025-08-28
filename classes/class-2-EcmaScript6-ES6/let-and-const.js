// scope
// Hoisting
// Reassignment
// Examples
// Arrow functions
// - features of arrow functions
// Template literals
// - features of Template literals


// scope
let m = 4

if (m > 2) {
    let n = 5
    console.log(n)
}
// console.log(n)

const obj = { name: 'John', age: 39 }
// const obj2 = { ...obj, name: 'Kent' }

const obj2 = Object.assign(obj, { name: 'Kent' })
// console.log(obj2)

const arr = [1, 2, 3]
const sArr = [...arr, 4]
console.log(sArr)