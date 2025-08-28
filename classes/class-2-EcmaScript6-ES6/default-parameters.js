// Default parameters

function oldWay(name, age) {
	name = name || 'Anonymous'
	aga = age || 0
}

function newWay(name = null) {
	console.log('Something')
	console.log(name)
}

function greetOld(name, greeting) {
	name = name || 'Guest'
	greeting = greeting || 'Hello'
	return greeting + ', ' + name + '!'
}

const greetNew = (name = 'Guest', greeting = 'Hello') => `${greeting}, ${name}!`
console.log(greetOld('', 'Hi'))
console.log(greetNew(undefined, 'Hi'))