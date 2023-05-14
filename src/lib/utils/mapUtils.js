export const style = (feature, options) => {
	let {
		dataAccessor,
		scale,
		weight = 0.1,
		opacity = 1,
		color = 'white',
		dashArray = 3,
		fillOpacity = 0.7
	} = options;

	return {
		fillColor:
			eval('feature.' + dataAccessor) === null ? 'grey' : scale(eval('feature.' + dataAccessor)),
		weight,
		opacity,
		color,
		dashArray,
		fillOpacity
	};
};
