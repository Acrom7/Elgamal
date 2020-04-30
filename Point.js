const mulinv = require('./common')

Number.prototype.mod = function (n) {
	return ((this % n) + n) % n
}

class Point {
	constructor(curve, x, y) {
		this.curve = curve
		this.x = x
		this.y = y
		if (!curve.belong(this)) {
			throw new Error(`Point ${this.toString()} doesn't belong to curve`)
		}
	}

	toString() {
		return `(${this.x}; ${this.y})`
	}

	add(operand) {
		if (this.equals(operand.negative())) {
			return new Point(this.curve, 0, 0)
		}

		const zero = new Point(this.curve, 0, 0)
		if (this.equals(zero)) {
			return operand
		}
		if (operand.equals(zero)) {
			return this
		}

		const {x: xp, y: yp} = this
		const {x: xq, y: yq} = operand
		const {a, b, power} = this.curve

		let m
		if (!(xp === xq)) {
			m = ((yp - yq) * mulinv(xp - xq, power)).mod(power)
		} else {
			m = ((3 * xp * xp + a) * mulinv(2 * yp, power)).mod(power)
		}

		const xr = (m * m - xp - xq).mod(power)
		const yr = (-(yp + m * (xr - xp))).mod(power)

		return new Point(this.curve, xr, yr)
	}

	mul(k) {
		let res = new Point(this.curve, 0, 0)
		for (let i = 1; i <= k; ++i) {
			res = res.add(this)
		}
		return res
	}

	equals(operand) {
		return this.curve.equals(operand.curve) && this.x === operand.x && this.y === operand.y
	}

	negative() {
		return new Point(this.curve, this.x, (-this.y).mod(this.curve.power))
	}
}

module.exports = Point