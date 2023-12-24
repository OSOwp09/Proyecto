import { code, listOfComments } from "./commentsListSlice";

export const openListOfComments = () => {
	return async (dispatch) => {
		try {
			dispatch(
				code({
					code: "Open",
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const closeListOfComments = () => {
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

export const createListOfComments = (json) => {

	return async (dispatch) => {
		try {
			dispatch(
				listOfComments({
					listOfComments: json,
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};
