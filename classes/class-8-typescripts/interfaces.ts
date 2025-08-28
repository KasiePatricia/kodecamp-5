// ## Interfaces
// - Basic interface
// - Optional and readonly properties
// - Interface methods
// - Interface extension
// - Interface vs type alias


// Basic interface declaration
interface IPerson {
	name: string
	age: number
	email?: string
	readonly id: string
}

const personData: IPerson = {
	id: '12334',
	name: 'John',
	age: 23,
}

// Interface extension
interface IAnimal {
	name: string
	age: number
}

interface IDog extends IAnimal {
	breed: string
	bark(): void
}

interface ICat extends IAnimal {
	isIndoor: boolean
	meow(): void
}

const myDog: IDog = {
	name: 'Tony Max',
	age: 3,
	breed: 'Ekuke',
	bark() {
		console.log('Woof!')
	},
}

interface IPet {
	owner: string
	vaccinated: boolean
}

interface IDomesticDog extends IDog, IPet {
	registered: boolean
}

const petDog: IDomesticDog = {
	name: 'Tony Max',
	age: 3,
	breed: 'Ekuke',
	bark() {},
	owner: 'John',
	vaccinated: true,
	registered: true,
}

// Function Interfaces
interface SearchFunction {
	(source: string, subString: string): boolean
}

const search: SearchFunction = (src, sub) => {
	return src.includes(sub)
}

//Interface with call signature and  properties
interface Counter {
	(start: number): string
	interval: number
	reset(): void
}

const counter: Counter = ((start: number) => {
	return `Count: ${start}`
}) as Counter

counter.interval = 1000
counter.reset = () => {
	console.log('Counter reset')
}

// Index signatures
interface StringDictionary {
	[key: string]: number
	length: number
}

const dic: StringDictionary = {
	length: 23,
	age: 28,
}

// Class Implementation
interface Drivable {
	speed: number
	drive(): void
	stop(): void
}

interface Flyable {
	altitude: number
	fly(): void
	land(): void
}

class Car implements Drivable {
	speed: number = 0

	drive(): void {
		this.speed = 60
		console.log(`Driving at ${this.speed}`)
	}

	stop(): void {
		this.speed = 0
		console.log(`Car stopped!`)
	}
}

class Airplane implements Drivable, Flyable {
	speed: number = 0
	altitude: number = 0

	drive(): void {
		this.speed = 60
		console.log(`Driving at ${this.speed}`)
	}

	stop(): void {
		this.speed = 0
		console.log(`Car stopped!`)
	}
	fly(): void {
		this.altitude = 30000
		console.log(`Car stopped!`)
	}
	land(): void {
		this.altitude = 0
		console.log(`Airplane stopped!`)
	}
}

// Declaration merging
interface Ex {
	title: string
}

interface Ex {
	name: string
}

declare var Some: Ex