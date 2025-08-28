// ## Type Annotations
// - Variable annotation
// - Object method annotation
// - Array and object annotation


// Variable annotations
let count: number = 0

//Function annotations
function greet(name: string, age: number): string {
	return `Hello ${name}, you are ${age} years old.`
}

// function add(a: number, b: number): number {
// 	return a + b
// }

const multiply = (x: number, y: number): number => {
	return x * y
}

function createUser(name: string, age: number, isAdmin: boolean = false): void {
	console.log(name)
}
// Obj annot.
let calculator = {
	add: (a: number, b: number): number => a + b,
	subtract(a: number, b: number): number {
		return a - b
	},
	multiply: null as ((a: number, b: number) => number) | null,
}
calculator.add(2, 3)
calculator.multiply?.(2, 3)

//Array and Obj annot.
type Student = Array<{
	name: string
	grade: number
	subjects: Array<string>
}>

let students: Student = [
	{ name: 'John', grade: 98, subjects: ['Math', 'Eng. Lang.'] },
]