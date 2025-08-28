// Basic generic function
function identity<T>(arg: T): T {
	return arg
}

const numRes = identity<number>(100)
const strRes = identity<string>('100')
const booRes = identity(true)

// Generic function with multiple parameters
function pair<T, U>(first: T, second: U): [T, U] {
	return [first, second]
}

const numStrPair = pair<number, string>(20, 'three')
const boolNumPair = pair(true, 100)

// Generic array operation
function getFirstElement<T>(arr: T[]): T | undefined {
	return arr.length > 0 ? arr[0] : undefined
}

const nums: number[] = []
const fNum = getFirstElement(nums)