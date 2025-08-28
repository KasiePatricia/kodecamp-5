// Definition
// Example

class Engine {
	start() {
		console.log('Engine starts')
	}
}

class Car {
	constructor() {
		this.engine = new Engine()
	}

	start() {
		this.engine.start()
		console.log('Car started')
	}
}

const myCar = new Car()
myCar.start()