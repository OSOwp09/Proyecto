import {code} from "./shareOptionsSlice";

export const closeShareOptions = () => {
	return async (dispatch) => {
		try {
			dispatch(
				code({
					code: "",
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const openShareOptions = (link) => {
	return async (dispatch) => {
		try {
            dispatch(
				code({
					code: link,
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};
