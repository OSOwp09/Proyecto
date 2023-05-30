import { useEffect } from "react";

export const UseScrollChange = (divScrollRef) => {
	useEffect(() => {
		const updateScroll = () => {
			console.log("holaaaa");
		};

		document.addEventListener("scroll", updateScroll);
	}, [divScrollRef]);
};
