class EmailService {
	send(to, subject, body) {
		console.log(`Sending email to ${to}: ${subject}`)
	}
}

class UserService {
	constructor(emailService) {
		//this.emailService = new EmailService()
		this.emailService = emailService
	}

	registerUser(userData) {
		console.log(`Registering user: ${userData.email}`)
		this.emailService.send(userData.email, 'Welcome!', 'Thanks for registering!')
	}
}

const emailService = new EmailService()
const userService = new UserService(emailService)
userService.registerUser({ email: 'john@doe.com' })