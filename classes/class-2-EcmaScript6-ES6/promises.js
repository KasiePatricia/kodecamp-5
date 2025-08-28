// Async handling
// Async/Await

const basicPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		const success = Math.random() > 0.5
		if (success) {
			console.log(success)

			resolve('Operation successful!')
		} else {
			reject(new Error('Operation failed!'))
		}
	}, 2000)
})

basicPromise
	.then(result => {
		console.log('Success:', result)
		return result.toUpperCase()
	})
	.then(uResult => {
		console.log(uResult)
	})
	.catch(error => {
		console.error('Error:', error)
	})
	.finally(() => {
		console.log('Promise completed (success or failure)')
	})

async function asyncAdd(a, b) {
	const success = Math.random() > 0.5
	return success ? a + b : b - a
}

const result = await asyncAdd(2, 3)
console.log(result)