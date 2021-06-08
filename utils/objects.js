export const getNumericalObject = (from, to) => {
	let range = {};
	for (let index = from; index <= to; index++) {
		range[index] = index;
	}
	return range;
};

export const getRangeByStep = (start, stop, step) => {
	var a = [start],
		b = start;
	let range = {};
	range[b] = b;
	while (b < stop) {
		b = b + step;
		range[b] = b || 1;
	}
	return range;
};
