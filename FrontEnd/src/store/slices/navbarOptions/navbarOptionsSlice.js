import { createSlice } from "@reduxjs/toolkit";

export const navbarOptionsSlice = createSlice({
	name: "navbarOptions",
	initialState: {
		code: "",
	},

	reducers: {
		openNavbarOptions: (state, action) => {
			state.code = action.payload.code;
		},
		closeNavbarOptions: (state, action) => {
			state.code = action.payload.code;
		},
	},
});

export const { openNavbarOptions, closeNavbarOptions } = navbarOptionsSlice.actions;