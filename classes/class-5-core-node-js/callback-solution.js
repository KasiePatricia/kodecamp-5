const fs = require('fs/promises')

function validateUser(user, cb) {
	setTimeout(() => cb(null, user), 100)
}

async function validateDataAsync(userData) {
	return new Promise((resolve, reject) => {
		validateUser(userData, (err, isValid) => {
			if (err) return reject(err)
			resolve(isValid)
		})
	})
}

validateDataAsync({ name: 'John', isValid: true })
	.then(isValid => {
		if (isValid) {
			throw new Error('Invalid User')
		}
		console.log('Promise', isValid)
	})
	.catch(err => {
		console.error('Err', err)
	})

async function processValidateFunc() {
	try {
		const isValid = await validateDataAsync({ name: 'John', isValid: true })
		if (!isValid) {
			throw new Error('Invalid user')
		}
		console.log('Async/Await', isValid)
	} catch (error) {
		console.error(error)
	}
}

processValidateFunc()