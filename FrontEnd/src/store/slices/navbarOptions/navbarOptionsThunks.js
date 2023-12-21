import { openNavbarOptions, closeNavbarOptions } from "./navbarOptionsSlice";

export const closeOptions = () => {
	return async (dispatch) => {
		try {
			dispatch(
				closeNavbarOptions({
					code: "",
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const openOptions = () => {
	return async (dispatch) => {
		try {
			dispatch(
				openNavbarOptions({
					code: "opened",
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};
