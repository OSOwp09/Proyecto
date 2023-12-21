import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/AuthSlice";
import { FilterSearchSlice } from "./slices/filterSearch/FilterSearchSlice";
import { navbarOptionsSlice } from "./slices/navbarOptions/navbarOptionsSlice";
import { shareOptionsSlice } from "./slices/shareOptions/shareOptionsSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		search: FilterSearchSlice.reducer,
		navbarOptions: navbarOptionsSlice.reducer,
		shareOptions: shareOptionsSlice.reducer,
	},
});
