interface Transport {
	deliver(): string
	getCost(distance: number): number
}

class Truck implements Transport {
	deliver(): string {
		return 'Delivering by truck on land.'
	}

	getCost(distance: number): number {
		return distance * 0.5 //$0.5 per km
	}
}

class Ship implements Transport {
	deliver(): string {
		return 'Delivering by ship on sea.'
	}

	getCost(distance: number): number {
		return distance * 1.0 //$1.0 per km
	}
}

class Plane implements Transport {
	deliver(): string {
		return 'Delivering by plane in air.'
	}

	getCost(distance: number): number {
		return distance * 2.0 //$2.0 per km
	}
}

abstract class LogisticsCompany {
	abstract createTransport(): Transport

	public planDelivery(distance: number): string {
		const transport = this.createTransport()
		const cost = transport.getCost(distance)
		return `${transport.deliver()}. Cost: $${cost.toFixed(2)} for ${distance} km.`
	}
}

class RoadLogisitics extends LogisticsCompany {
	createTransport(): Transport {
		return new Truck()
	}
}

class SeaLogistics extends LogisticsCompany {
	createTransport(): Transport {
		return new Ship()
	}
}

class AirLogistics extends LogisticsCompany {
	createTransport(): Transport {
		return new Plane()
	}
}

/**
 * Usage example
 */
function clientCode(logistics: LogisticsCompany, distance: number): void {
	console.log(logistics.planDelivery(distance))
}

const roadLogistics = new RoadLogisitics()
const seaLogistics = new SeaLogistics()
const airLogistics = new AirLogistics()

clientCode(roadLogistics, 100) // Truck delivery
clientCode(seaLogistics, 200) // Ship delivery
clientCode(airLogistics, 300) // Plane delivery
clientCode(roadLogistics, 150) // Truck delivery with different distance