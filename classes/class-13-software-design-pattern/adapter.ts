/**
 * Legacy payment system adaptee
 */
class LegacyPaymentGateway {
	makePayment(amount: number): string {
		return `Processed  $${amount} via legacy system`
	}

	getTransactionFee(amount: number): number {
		return amount * 0.05 // 5% transaction fee
	}
}

interface PaymentResult {
	success: boolean
	message: string
	transactionId: string
}

/**
 * Modern payment interface (Target)
 */
interface PaymentGateway {
	processPayment(amount: number): PaymentResult
	calculateFees(amount: number): number
}

/**
 * Adapter that makes legacy payment system compatible with modern interface
 */
class PaymentAdapter implements PaymentGateway {
	private legacyGateWay: LegacyPaymentGateway

	constructor(legacyGateway: LegacyPaymentGateway) {
		this.legacyGateWay = legacyGateway
	}

	processPayment(amount: number): PaymentResult {
		try {
			const message = this.legacyGateWay.makePayment(amount)
			const transactionId = `TXN_${crypto.randomUUID().substring(0, 8)}`
			return {
				success: true,
				message,
				transactionId,
			}
		} catch (error) {
			return {
				success: false,
				message: 'Payment processing failed',
				transactionId: '',
			}
		}
	}

	calculateFees(amount: number): number {
		return this.legacyGateWay.getTransactionFee(amount)
	}
}

/**
 * Modern payment system
 */
class StripePaymentProcessor implements PaymentGateway {
	processPayment(amount: number): PaymentResult {
		return {
			success: true,
			message: `Processed $${amount} via Stripe`,
			transactionId: `TXN_${crypto.randomUUID().substring(0, 8)}`,
		}
	}

	calculateFees(amount: number): number {
		return amount * 0.03 // 3% transaction fee
	}
}

/**
 * Client code that works with any modern payment processor
 */
class PaymentService {
	private processor: PaymentGateway

	constructor(processor: PaymentGateway) {
		this.processor = processor
	}

	makePayment(amount: number): void {
		const fees = this.processor.calculateFees(amount)
		const totalAmount = amount + fees
		console.log(
			`Processing payment of $${amount} with fees of $${fees}. Total: $${totalAmount}`,
		)
		const result = this.processor.processPayment(totalAmount)
		if (result.success) {
			console.log(
				`Payment successful: ${result.message}, Transaction ID: ${result.transactionId}`,
			)
		} else {
			console.error(`Payment failed: ${result.message}`)
		}
	}
}

/**
 * Usage example
 */
const legacyGateway = new LegacyPaymentGateway()
const adapter = new PaymentAdapter(legacyGateway)
const stripeProcessor = new StripePaymentProcessor()

const legacyPaymentService = new PaymentService(adapter)
const stripePaymentService = new PaymentService(stripeProcessor)

legacyGateway.makePayment(100) // Legacy system usage
legacyPaymentService.makePayment(100) // Using adapter for legacy system
stripePaymentService.makePayment(100) // Using modern Stripe processor