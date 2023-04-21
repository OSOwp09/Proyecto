import { FilterImagesByHashTagSlice, search } from "./FilterImagesByHashTagSlice";

export const searchPublications = (words) => {
	return async (dispatch) => {
		try {
			// dispatch the logout action
			dispatch(search({
                words: words
            }));
		} catch (error) {
			console.log(error.message);
		}
	};
};
