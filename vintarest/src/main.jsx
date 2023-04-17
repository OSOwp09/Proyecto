import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import Prueba from './components/prueba'
import { Provider } from "react-redux";
import { store } from "./store/store";

import { OpenPublication } from "./components/index/openPublication";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			{/* <Prueba/> */}
		</Provider>
	</React.StrictMode>
);
