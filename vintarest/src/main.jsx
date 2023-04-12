import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import { configureStore } from '@reduxjs/toolkit'

import Prueba from './components/prueba'
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <App /> */}
      <Prueba/>
		</Provider>
	</React.StrictMode>
);
