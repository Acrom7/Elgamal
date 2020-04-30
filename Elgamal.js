const Point = require('./Point')
const mulinv = require('./common')

class Elgamal {
	constructor(curve, startPoint, primeNumber) {
		this.curve = curve
		this.startPoint = startPoint
		this.primeNumber = primeNumber

		let k = 0
		const zero = new Point(curve, 0, 0)
		let qqq = new Point(curve, 0, 0)
		do {
			qqq = qqq.add(this.startPoint)
			++k
		} while (!qqq.equals(zero))
		this.generatorPower = k

		let intRandom = max => Math.floor(Math.random() * max)
		this.randomNumber = intRandom(this.generatorPower)
		this.randomNumber = 523
	}

	encrypt(message, openKeyAnotherUser) {
		this.r = this.startPoint.mul(this.randomNumber)
		this.p = openKeyAnotherUser.mul(this.randomNumber)
		let e = (message * this.p.x) % this.primeNumber
		return [this.r, e]
	}

	decrypt(r, e, factor = 5103) {
		let q = r.mul(factor)
		return (e * mulinv(q.x, this.primeNumber)).mod(this.primeNumber)
	}
}

module.exports = Elgamal