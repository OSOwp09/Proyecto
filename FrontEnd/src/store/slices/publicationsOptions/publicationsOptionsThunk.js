import { code } from "./publicationsOptionsSlice";

export const closePublicationsOptions = () => {
	return async (dispatch) => {
		try {
			dispatch(
				code({
					code: "",
				})
			);
		} catch (error) {
			console.log(error.messsage);
		}
	};
};

export const openPublicationsOptions = (img) => {
	return async (dispatch) => {
		try {
			dispatch(
				code({
					code: img,
				})
			);
		} catch (error) {
			console.log(error.messsage);
		}
	};
};
