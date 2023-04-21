import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/AuthSlice";
import { FilterImagesByHashTagSlice } from "./slices/filterImagesByHashTag/FilterImagesByHashTagSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		search: FilterImagesByHashTagSlice.reducer
	},
});
