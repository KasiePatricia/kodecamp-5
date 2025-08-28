// Rest and spread opereators


// spread
const name = 'John'
console.log(...name)

for (const char of name) {
	console.log(char)
}


// rest
const nums1 = [1, 2, 3]
const nums2 = [4, 5, 6]

const mergedNums = [0, ...nums1, 10, 11, ...nums2, 2000]

function sum(a, b, c) {
	return a + b + c
}
const nums = [1, 2, 3]
const result = sum(...nums) 

const [fN, ...restNums] = nums

const user = {
	name: 'John',
	age: 29,
	state: 'Lagos',
}
const { name: username, ...restUser } = user
console.log(restUser)