// ## Type Aliases
// - Basic type aliases
// - Object type aliases
// - Function type aliases
// - Complex type aliases


// Basic Type Aliases
type UserName = string
type Age = number
type IsActive = boolean | null

const a: Age = 23

// Object type aliases
type User = {
	id: string
	name: string
	age: number
	email?: string
	readonly createdAt: Date
}

const user: User = {
	id: '1234',
	name: 'John',
	age: 23,
	createdAt: new Date(),
}

// Union type aliases
type Status = 'pending' | 'approved'
type ID = string | number

//Complex union
type Res =
	| {
			success: true
			data: any
	  }
	| {
			success: false
			error: string
	  }

const handleRessponse = (response: Res) => {
	if (response.success) {
		console.log(response.data)
	} else {
		console.log(response.error)
	}
}

// Function type aliases
type EventHandler = (event: Event) => void
type Calculator = (a: number, b: number) => number
type AsyncFetcher<T> = (url: string) => Promise<T>

const handleClick: EventHandler = event => {
	console.log('Button clicked')
}
const addNum: Calculator = (a, b) => {
	const someVal = '2'
	return a + b + Number(someVal)
}