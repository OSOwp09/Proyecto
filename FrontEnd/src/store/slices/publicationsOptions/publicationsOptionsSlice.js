import { createSlice } from "@reduxjs/toolkit";

export const publicationsOptionsSlice = createSlice({
	name: "publicationsOptions",
	initialState: {
		code: "",
	},

	reducers: {
		code: (state, action) => {
			state.code = action.payload.code;
		},
	},
});

export const { code } = publicationsOptionsSlice.actions;