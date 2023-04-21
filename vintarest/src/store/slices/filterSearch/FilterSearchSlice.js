import { createSlice } from "@reduxjs/toolkit";

export const FilterSearchSlice = createSlice({
	name: "search",
	initialState: {
		words: "",
		searchFor:"publications"
	},
	reducers: {
		search: (state, action) => {
			state.words = action.payload.words;
		},
	},
});

export const { search } =
	FilterSearchSlice.actions;
