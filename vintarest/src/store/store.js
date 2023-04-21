import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/AuthSlice";
import { FilterSearchSlice } from "./slices/filterSearch/FilterSearchSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		search: FilterSearchSlice.reducer
	},
});
