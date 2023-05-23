import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "checking",
		uid: null,
		email: null,
		user: null,
		name: null,
		hashtags: null,
		photoUrl: null,
		token: null,
		errorMessage: null,
	},
	reducers: {
		register: (state, action) => {
			state.email = action.payload.email;
		},
		login: (state, action) => {
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.user = action.payload.user;
			state.name = action.payload.name;
			state.hashtags = action.payload.hashtags;
			state.photoUrl = action.payload.photoUrl;
			state.token = action.payload.token;
		},
		logout: (state ) => {
			state.uid = null;
			state.email = null;
			state.user = null;
			state.name = null;
			state.hashtags = null;
			state.photoUrl = null;
			state.token = null;
		},
		checkingCredentials: (state, action) => {
			console.log("checking");
		},
	},
});

export const { login, logout, checkingCredentials, register } =
	authSlice.actions;
