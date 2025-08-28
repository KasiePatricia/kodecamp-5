// Definition
// Examples

class Person {
	#name = 'John'
	#age = 29
	constructor(name, age) {
		this.#name = name
		this.#age = age
	}

	#getDetails() {
		return `${this.#name} is ${this.#age}`
	}

	publicDetails() {
		return this.#getDetails()
	}
}

console.log(new Person('John', 29).publicDetails())