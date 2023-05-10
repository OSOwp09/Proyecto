import { useState, useEffect } from "react";

export const useRefDimensions = (ref) => {
	const [dimensions, setDimensions] = useState({ width: 1, height: 2 });

	useEffect(() => {
		setTimeout(() => {
			if (ref.current) {
				setDimensions({
					width: Math.round(ref.current.offsetWidth),
					height: Math.round(ref.current.offsetHeight),
				});
			}
		}, 1);
	}, [ref]);
	return dimensions;
};
