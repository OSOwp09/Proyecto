import { lazy, Suspense } from "react";

// --- components (test) ---

// ---- Pages ---

const Login = lazy(() => import("./pages/Login/loginPage"));
const Index = lazy(() => import("./pages/Index"));
const Error = lazy(() => import("./pages/ErrorPage/error"));

//---- Other ---

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loadUser } from "./store/slices/auth/AuthThunks";
import { UpdateDataBase } from "./api/Api";

function App() {
	document.body.classList.add("bg-primary-light");
	const dispatch = useDispatch();

	const [loadApp, setLoadApp] = useState(<></>);

	useEffect(() => {
		onAuthStateChanged(auth, async () => {
			if (auth?.currentUser?.email) {
				dispatch(loadUser(auth.currentUser.email));
			}

			setLoadApp(
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<Suspense>
									<Login />
								</Suspense>
							}
						/>
						<Route
							path="/login/*"
							element={
								<Suspense>
									<Login />
								</Suspense>
							}
						/>
						<Route
							path="/home/*"
							element={
								<Suspense>
									<Index />
								</Suspense>
							}
						/>
						<Route
							path="*"
							element={
								<Suspense>
									<Error />
								</Suspense>
							}
						/>
						<Route
							path="/Error404"
							element={
								<Suspense>
									<Error />
								</Suspense>
							}
						/>
					</Routes>
				</Router>
			);
		});
	}, []);

	return (
		<>
			<div className="font-inter ">{loadApp}</div>
		</>
	);
}

export default App;