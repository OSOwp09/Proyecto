import { createSlice } from "@reduxjs/toolkit";

export const shareOptionsSlice = createSlice({
	name: "shareOptions",
	initialState: {
		code: "",
	},

	reducers: {
		code: (state, action) => {
			state.code = action.payload.code;
		},
	},
});

export const { code } = shareOptionsSlice.actions;