function fetchUser(id, cb) {
	validateUser(user, cb)

	setTimeout(() => cb(null, { id, name: 'John', status: 'pending' }), 100)
}

function validateUser(user, cb) {
	updateUserStatus(user.id, 'active', (err, result) => {
		if (err) return cb(err)
		console.log('User status updated')
		cb(null, { ...user, status: 'completed' })
	})
	setTimeout(() => cb(null, true), 100)
}

function updateUserStatus(id, status, cb) {
	setTimeout(() => cb(null, { id, status }), 100)
}

function processUserWorkflow(userId, cb) {
	console.log('Starting user workflow...')
	fetchUser(userId, cb)
}

processUserWorkflow('user190', (err, data) => {
	if (err) {
		console.log('Error:', err.meesage)
	}
	console.log(data)
})