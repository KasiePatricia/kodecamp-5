function fact(n) {
	if (n === 0 || n === 1) {
		return 1
	} else {
		return n * fact(n - 1)
	}
}
// 0! = 1
// 1! = 1
// 2! = 2x1 = 2
// 3! = 3x2x1 = 6
// 4! = 4x3x2x1 = 24
