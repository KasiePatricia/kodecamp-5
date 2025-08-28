// ## Union and intersection types
// - Union Types (|)
// - Array union types
// - Intersection types (&)


type Interviewee = {
	name: string
	age: number
}

type Staff = {
	employeeId: string
	department: string
}

type HiredStaff = Staff & Interviewee

let worker: HiredStaff = {
	name: 'John',
	age: 30,
	employeeId: '233445',
	department: 'Enginerring',
}