import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "checking",
		uid: null,
		email: null,
		displayName: null,
		photoUrl: null,
		errorMessage: null,
	},
	reducers: {
		register: (state, action) => {
			state.email = action.payload.email;
		},
		login: (state, action) => {
			state.email = action.payload.email;
		},
		logout: (state, action) => {
			state.email = null
		},
		checkingCredentials: (state, action) => {
			console.log("checking");
		},
	},
});

export const { login, logout, checkingCredentials, register } =
	authSlice.actions;
