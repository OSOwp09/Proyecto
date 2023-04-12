import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./amount/counter";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
	},
});
