function fetchUserData(userId, callback) {
	setTimeout(() => {
        //error first
		if (userId === 'invalid') {
			return callback(new Error('Invalid user ID'), null)
		}

		const userData = {
			id: userId,
			name: 'John Doe',
			email: 'john@doe.com',
		}
		callback(null, userData)
	}, 2000)
}

fetchUserData('user290', (error, data) => {
	if (error) {
		console.error('Error fetching user:', error.message)
		return
	}
	console.log('User data:', data)
})

 