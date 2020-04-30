const {create, all} = require('mathjs')
const math = create(all, {matrix: 'Array'})

function mulinv(n, p) {
	let [gcd, x, y] = math.xgcd(n, p)
	if (gcd !== 1) {
		console.error('No multiplicative inverse')
	} else {
		return x % p
	}
}

module.exports = mulinv