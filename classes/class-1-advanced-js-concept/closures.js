// closures

function outerFunction() {
    let m = 5
    // lexical scope starting
    function innerFunction(n) {
        console.log(m + n)
        // return m + n
    }
    // lexical scope ending
    return innerFunction
}

// const addTwo = outerFunction()
// addTwo(3)


function createCounter() {
    let count = 0
    return function () {
        count++
        return count
    }
}

const c1 = createCounter()
const c2 = createCounter()

console.log(c1())
console.log(c2())


function bankAccount(initialBalance) {
	let balance = initialBalance

	return {
		deposit: function (amount) {
			balance += amount
			return balance
		},

		withdraw: function (amount) {
			if (amount <= balance) {
				balance -= amount
				return balance
			}

			return 'Insufficient funds'
		},

		getBalance: function () {
			return balance
		},
	}
}

const account = bankAccount(100)
console.log("DEPOSIT",account.deposit(70))
console.log("WITHDRAW",account.withdraw(50))
console.log("BALANCE",account.getBalance())

for (var i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i)
    }, 100)
}

for (let i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i)
    }, 100)
}

for (var i = 0; i < 4; i++) {
	;(function (index) {
		setTimeout(function () {
			console.log(index)
		}, 100)
	})(i)
}