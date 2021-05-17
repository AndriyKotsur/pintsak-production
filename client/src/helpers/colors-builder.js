const ColorsBuilder = (colors, type, color, price) => {
	const values = colors

	switch (type) {
		case 'add':
			values[color] = price; break
		case 'remove':
			delete values[color]; break
		default: break
	}

	return values
}

export default ColorsBuilder
