class DatabaseConnection {
	private static instance: DatabaseConnection
	private connectionString: string
	private isConnected: boolean = false

	/**
	 * Private constructor to prevent direct instantiation
	 */
	private constructor() {
		this.connectionString = 'postgresql://localhost:5432/mydb'
	}

	/**
	 * Method to get the singleton instance of DatabaseConnection
	 * @returns {DatabaseConnection} The singleton instance
	 */
	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new DatabaseConnection()
		}
		return DatabaseConnection.instance
	}

	/**
	 * Method to connect to the database
	 */
	public connect(): void {
		if (!this.isConnected) {
			console.log(`Connecting to database at ${this.connectionString}...`)
			this.isConnected = true
		} else {
			console.log('Already connected to the database.')
		}
	}

	public query(sql: string): string[] {
		if (!this.isConnected) {
			throw new Error('Database not connected. Please connect first.')
		} else {
			return [`Result for query: ${sql}`]
		}
	}
}

const db1 = DatabaseConnection.getInstance()
const db2 = DatabaseConnection.getInstance()

console.log(db1 === db2) // true
db1.connect()
db2.connect() // Already connected message
db2.connect() // Already connected message
db2.connect() // Already connected message