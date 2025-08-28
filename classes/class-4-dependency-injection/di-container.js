// Dependency Iinjection container

// why do we need a DI container?
// Basic DI container implementation

class DIContainer {
	constructor() {
        // singleton - one instance
		this.services = new Map()
		this.singletons = new Map()
	}

	register(name, factory, dependencies = []) {
		this.services.set(name, {
			factory,
			dependencies,
			singleton: false,
		})
	}

	registerSingleton(name, factory, dependencies = []) {
		this.services.set(name, {
			factory,
			dependencies,
			singleton: true,
		})
	}

	resolve(name) {
		const serviceConfig = this.services.get(name)

		if (!serviceConfig) {
			throw new Error(`Service ${name} is not found`)
		}

		if (serviceConfig.singleton && this.singletons.has(name)) {
			return this.singletons.get(name)
		}

		const dependencies = serviceConfig.dependencies.map(dep => this.resolve(dep))
		const instance = serviceConfig.factory(...dependencies)

		if (serviceConfig.singleton) {
			this.singletons.set(name, instance)
		}

		return instance
	}
}

class EmailService {
	send(to, subject, body) {
		console.log(`📧 Email sent to ${to}: ${subject}`)
	}
}

class LoggerService {
	log(message) {
		console.log(`✉️ LOG: ${message}`)
	}
}

class UserService {
	constructor(emailService, logger) {
		this.emailService = emailService
		this.logger = logger
	}

	registerUser(userData) {
		this.logger.log(`Register user: ${userData.email}`)
		this.emailService.send(userData.email, 'Welcome!', 'Thanks for registering')
		this.logger.log('User registered')
	}
}

const container = new DIContainer()

container.registerSingleton('emailService', () => new EmailService())
container.registerSingleton('logger', () => new LoggerService())
container.registerSingleton('emailService', () => new EmailService())
container.registerSingleton('logger', () => new LoggerService())

const userServiceName = 'userService'

const userServiceInstance = (emailService, logger) =>
	new UserService(emailService, logger)

container.register(
	userServiceName,
	userServiceInstance[('emailService', 'logger')],
)

container.register(
	userServiceName,
	(emailService, logger) => new UserService(emailService, logger),
	['emailService', 'logger'],
)

const userService = container.resolve(userServiceName)

class MockEmailService {
	constructor() {
		this.sentEmails = []
	}

	send(to, body, subject) {
		this.sentEmails.push({ to, body, subject })
	}

	getSentEmails() {
		return this.sentEmails
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

function testUserRegistration() {
	const mockEmail = new MockEmailService()
	const mockLogger = new MockLogger()
	const userService = new UserService(mockEmail, mockLogger)
	const userData = { email: 'john@doe.com', name: 'John' }
	userService.registerUser(userData)
	const sentEmails = mockEmail.getSentEmails()
	console.log(sentEmails.length === 1, 'Should send one email')
}

testUserRegistration()