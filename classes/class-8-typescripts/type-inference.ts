// ## Type Inference
// - Basic type inference
// - Function return type inference
// - Contextual type inference
// - Best practics for type inference
// - When type inference fails


// Basic types inference
let lastName = 'John'
let pAge = 25
let isAdmin = true
let items: number[] = [1, 2, 3]

let emp: string[] = []
let emp2 = ['John'] 

// Function return type inference
function add(a: number, b: number) {
	return a + b
}

function fullName(fName: string, lName: string) {
	return `${fName} ${lName}`
}

function processUser(user: { name: string }) {
	return user.name
}

//Complex inference with conditions
function processValue(number: number) {
	if (number > 0) {
		return 'positive'
	} else if (number < 0) {
		return 'negative'
	} else {
		return 0
	}
}

//Contextual type inference
let numss = [1, 2, 3, 4, 5, 'John']
numss.forEach(num => {
	if (typeof num === 'number') {
		console.log(num.toFixed(2))
	} else {
		console.log(num.toUpperCase())
	}
})