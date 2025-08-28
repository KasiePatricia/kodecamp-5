// Definition
// Example

class Database {
	save(data) {
		console.log(`Saving ${data} to database`)
	}
}

class UserService {
	constructor(database) {
		this.database = database
	}

	createUser(name) {
		this.database.save(name)
	}
}

const db = new Database()
const userService = new UserService(db)
userService.createUser('John')