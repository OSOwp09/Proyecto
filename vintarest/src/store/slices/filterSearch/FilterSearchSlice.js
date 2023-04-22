import { createSlice } from "@reduxjs/toolkit";

export const FilterSearchSlice = createSlice({
	name: "search",
	initialState: {
		words: "",
		userId:""
	},
	reducers: {
		search: (state, action) => {
			state.words = action.payload.words;
		},
		userId: (state, action) => {
			state.userId = action.payload.userId;
		},
	},
});

export const { search, userId } =
	FilterSearchSlice.actions;
