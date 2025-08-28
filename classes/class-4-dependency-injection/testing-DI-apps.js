// Testing ID applications
// 
// Why DI makes tesing easier
// - Easy mocking
// - isolation 
// - predictability
// - speed 

class MockEmailService {
	constructor() {
		this.sentEmails = []
	}

	send(to, body, subject) {
		this.sentEmails.push({ to, body, subject })
	}

	getSentEmails() {
		return this.sentEmails()
	}

	clear() {
		this.sentEmails = []
	}
}

class MockLogger {
	constructor() {
		this.logs = []
	}

	log(message) {
		this.logs.push(message)
	}

	getLogs() {
		return this.logs()
	}

	clear() {
		this.logs = []
	}
}

class UserService {
	constructor(emailService, logger) {
		this.emailService = emailService
		this.logger = logger
	}

	registerUser(userData) {
		this.logger.log(`Register user: ${userData.email}`)
		this.emailService.send(userData.email, 'Welcome!', 'Thannks for registering')
		this.logger.log('User registered')
	}
}

function testUserRegistration() {
	const mockEmail = new MockEmailService()
	const mockLogger = new MockLogger()
	const userService = new UserService()
	const userData = { email: 'john@doe.com', name: 'John' }
}