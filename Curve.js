class Curve {
	constructor(power, a, b) {
		// y^2 = x^3 + ax + b
		this.power = power
		this.a = a
		this.b = b
	}

	belong(point) {
		const {x, y} = point
		const left = y * y
		const right = x * x * x + this.a * x + this.b
		return x === 0 && y === 0 || left % this.power === right % this.power
	}

	equals(curve) {
		return this.a === curve.a && this.b === curve.b
	}
}

module.exports = Curve