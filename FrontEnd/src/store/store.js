import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/AuthSlice";
import { FilterSearchSlice } from "./slices/filterSearch/FilterSearchSlice";
import { navbarOptionsSlice } from "./slices/navbarOptions/navbarOptionsSlice";
import { shareOptionsSlice } from "./slices/shareOptions/shareOptionsSlice";
import { publicationsOptionsSlice } from "./slices/publicationsOptions/publicationsOptionsSlice";
import { commentsListSlice } from "./slices/commentsList/commentsListSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		search: FilterSearchSlice.reducer,
		navbarOptions: navbarOptionsSlice.reducer,
		shareOptions: shareOptionsSlice.reducer,
		publicationsOptions: publicationsOptionsSlice.reducer,
		commentsList: commentsListSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["your/action/type"],
				// Ignore these field paths in all actions
				ignoredActionPaths: ["meta.arg", "payload.timestamp"],
				// Ignore these paths in the state
				ignoredPaths: ["items.dates"],
			},
		}),
});
