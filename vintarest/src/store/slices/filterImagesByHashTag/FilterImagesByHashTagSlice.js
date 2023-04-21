import { createSlice } from "@reduxjs/toolkit";

export const FilterImagesByHashTagSlice = createSlice({
	name: "search",
	initialState: {
		words: "",
	},
	reducers: {
		search: (state, action) => {
			state.words = action.payload.words;
		},
	},
});

export const { search } =
	FilterImagesByHashTagSlice.actions;
