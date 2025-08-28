//Functional programming

// core concepts
// pure functions
// side effect
// Higher-Order functions
// Function Composition

// pure functions
function addT(a, b) {
	return a + b
}
console.log(addT(2,3))

// inpure functions
let total = 0

total = 89

function addTotal(amount) {
	total += amount
	return total
}
addTotal(5)

// Higher-Order functions
const users = [
	{ name: 'John', active: false, age: 20 },
	{ name: 'Kent', active: true, age: 39 },
	{ name: 'Josh', active: true, age: 29 },
]
const returnActiveUsers = user => user.active
const names = users.map(user => user.name)
console.log(names)

const activeUsers = users.filter(returnActiveUsers)
console.log(activeUsers)

const totalAge = users.reduce((sum, user) => {
	console.log({ sum, user })
	return sum + user.age
}, 0)
console.log(totalAge)

const activeUserNames = users
	.filter(user => user.active)
	.map(user => user.name)
	.sort()
console.log(activeUserNames)

const add = (a, b) => a + b
const square = m => m * m
const subtractByOne = n => n - 1
const addThenSquare = k => square(subtractByOne(add(k, 2)))
const compose = k => m => n => k + m + n

console.log(compose(5)(2)(3))
const f = compose(5)
const s = f(2)
const t = s(3)
console.log(t)