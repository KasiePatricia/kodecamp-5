// Extend
// Super
// Example

class Animal {
	constructor(name) {
		this.name = name
	}

	speak() {
		console.log(`${this.name} makes noise`)
	}
}

class Dog extends Animal {
	constructor(name, breed) {
		super(name)
		this.breed = breed
	}

	speak() {
		console.log(`${this.name} barks, and the breed is ${this.breed}!`)
	}
}

const dog = new Dog('Rex', 'Ekuke')