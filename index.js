const Point = require('./Point')
const Curve = require('./Curve')
const Elgamal = require('./Elgamal')

const curve = new Curve(31991, 31988, 1000)
let g = new Point(curve, 0, 5585)

let g2 = new Point(curve, 0, 0)
for (let i = 1; i <= 32089; ++i) {
	g2 = g2.add(g)
	console.log(`№${i} -  ${g2.toString()}`)
}


const p = 5103
let openKeyUserB = g.mul(p)

const a = new Elgamal(curve, g, 31991)
const message = 10000
let encrypted = a.encrypt(message, openKeyUserB)
let decryptedValue = a.decrypt(...encrypted)
console.log(`message = ${message}`)
console.log(`encrypted = ${encrypted[1]}`)
console.log(`decrypted = ${decryptedValue}`)