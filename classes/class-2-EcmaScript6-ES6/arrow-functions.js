// features
// - short syntax
// - No 'this' binding
// - No new keyword
// Template literals
// - feature

const m = function (x) {
	return x * 2
}
console.log(m(4))

const n = (x, y) => (anom = () => ({}))
console.log(n(2, 3))

// const arg1 = (a, b) => {
// 	console.log(arguments)
// }

function arg(a, b) {
	console.log(arguments)
}
arg(1, 2)
// arg1(2, 3)

class Timer {
	constructor() {
		this.seconds = 0
	}

	startTraditional() {
		setInterval(function () {
			this.seconds++
			console.log(this.seconds)
		}, 1000)
	}

    startTraditionalBind() {
		setInterval(function () {
			this.seconds++
			console.log(this.seconds)
		}.bind(this), 1000)
	}

	startArrow() {
		setInterval(() => {
			this.seconds++
			console.log(this.seconds)
		}, 1000)
	}
}

// const timer = new Timer()
// timer.startArrow()