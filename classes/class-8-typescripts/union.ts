// ## Union and intersection types
// - Union Types (|)
// - Array union types
// - Intersection types (&)



// Union types
let id: string | number
id = 'abcd987'
id = 871235

function priintId(id: string | number): void {
	console.log(`ID:${id ?? 'No id'}`)
}

priintId(123)
priintId('abcd')

// Array union types
type Cat = { name: string; meows: boolean }
type Dog = { name: string; barks: boolean }

let pets: Array<Cat | Dog> = [{ name: 'Whiskers', meows: true }]