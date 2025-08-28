// ## Basic types and type system
// - Primitive type
// - Array types
// - Object types
// - special types



// Number
let age: number = 25
let price: number = 19.99
let hex: number = 0xff
let binary: number = 0b1010

// String
let pName: string = 'John'
let fullname: string = `${pName}`

//Boolean
let isActive: boolean = true
let isComplete: boolean = false

// NUll and Undefined
let date: null = null
let value: undefined = undefined

// Array method 1
let numbers: number[] = [1, 2, 3, 4, 5]
let names: string[] = ['John', 'Kent', 'Josh']

// Array method 2
let numbers2: Array<number> = [1, 2, 3, 4, 5]
let names2: Array<string> = ['John', 'Josh', 'Kent']

let mixed: (string | number)[] = [1, 2, 'John', 'Kent', 8, 4]
let mixed2: Array<string | number> = [1, 2, 'John', 'Kent', 8, 4]

//Object types
type Person = { name: string; age: number; isEmployed?: boolean }

let person: Person = {
	name: 'John',
	age: 30,
}

let person2: Person = {
	name: 'John',
	age: 30,
	isEmployed: true,
}

// Special types
//Any
let anything: any = 42
anything = 'Yo'
anything = true

//Unknown
let userInput: unknown
userInput = 5
userInput = true

if (typeof userInput === 'string') {
	console.log(userInput.toUpperCase())
}

if (typeof userInput === 'number') {
	console.log(userInput + 23)
}