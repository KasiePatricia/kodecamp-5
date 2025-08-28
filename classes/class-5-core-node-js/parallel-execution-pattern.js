function fetchUserData(id, cb) {
	setTimeout(() => cb(null, { id, name: 'John', age: 29 }), 200)
}

function fetchUserPosts(id, cb) {
	setTimeout(() => cb(null, ['post1', 'post2', 'post3']), 150)
}

function fetchUserFriends(id, cb) {
	setTimeout(() => cb(null, ['Kent', 'Josh']), 100)
}

function fetchAllUserData(userId, cb) {
	let completed = 0
	let hasError = 0
	const results = {}

	const operations = [
		{ name: 'profile', fn: fetchUserData },
		{ name: 'posts', fn: fetchUserPosts },
		{ name: 'friends', fn: fetchUserFriends },
	]

	operations.forEach(operation => {
		operation.fn(userId, (err, data) => {
			if (hasError) return
			if (err) {
				hasError = true
				return cb(err)
			}
			results[operation.name] = data
			completed++

			if (completed === operations.length) {
				cb(null, results)
			}
		})
	})
}

fetchAllUserData('user34', (err, data) => {
	if (err) {
		console.error('Error:', err.message)
		return
	}
	console.log('All user data:', data)
})