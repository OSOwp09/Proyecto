import { lazy, Suspense, useRef } from "react";

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
	const updateDataBase = async () => {
		try {
			await UpdateDataBase.get("", {});
		} catch (error) {}
	};

	document.body.classList.add("bg-primary-light");
	const dispatch = useDispatch();

	const [loadApp, setLoadApp] = useState(<></>);

	useEffect(() => {
		updateDataBase();
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

	const divRef = useRef(null);
	const scrollToTop = () => {
		divRef?.current?.scroll({
			top: 0,
		});
	};

	const [height, setHeight] = useState(0);

	useEffect(() => {
		scrollToTop();
		const updateWindowDimensions = () => {
			const newHeight = window.visualViewport.height;
			setHeight(newHeight);
		};

		window.visualViewport.addEventListener("resize", updateWindowDimensions);
		updateWindowDimensions();
		//console.log(height)
		return () =>
			window.visualViewport.removeEventListener(
				"resize",
				updateWindowDimensions
			);
	}, [, height]);

	return (
		<>
			<div
				ref={divRef}
				//style={{ height: `${window.visualViewport.height}px` }}
				className="transition-all font-inter overflow-hidden w-screen h-[100dvh]"
			>
				{loadApp}
			</div>
		</>
	);
}

export default App;
