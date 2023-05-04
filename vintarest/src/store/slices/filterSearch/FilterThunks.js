import { FilterSearchSlice, search, userId } from "./FilterSearchSlice";

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


export const searchUserPublications = (id) => {
	return async (dispatch) => {
		try {
			// dispatch the logout action
			dispatch(userId({
                userId: id
            }));
		} catch (error) {
			console.log(error.message);
		}
	};
};

