import { createSlice } from "@reduxjs/toolkit";

export const commentsListSlice = createSlice({
	name: "commentsList",
	initialState: {
		code: "",
		listOfComments: null,
	},

	reducers: {
		code: (state, action) => {
			state.code = action.payload.code;
		},
		listOfComments: (state, action) => {
			state.listOfComments = action.payload.listOfComments;
		},
	},
});

export const { code, listOfComments } = commentsListSlice.actions;
