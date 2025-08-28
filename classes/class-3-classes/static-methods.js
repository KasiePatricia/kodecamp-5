// Definition
// Examples

class _Math {
	static abs(a) {
		if (!a) {
			throw new Error('Empty value argument')
		}
		if (typeof a !== 'number') {
			throw new Error('Value must be of type "number"')
		}

		if (a < 0) {
			return -1 * a
		} else {
			return a
		}
	}
}

console.log(_Math.abs(6))