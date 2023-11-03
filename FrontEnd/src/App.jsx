import { lazy, Suspense } from "react";

// --- components ---

/*import { Navbar } from "./components/shared/navbar";
import { ImageLayout } from "./components/shared/imagelayout";
import { ImageSelected } from "./components/shared/imageSelected";
import { ChatList } from "./components/chat/chatList";
import { Chat } from "./components/chat/chat";
import { OptionsCard } from "./components/shared/options";
import { UserCard } from "./components/userPage/userCard";*/

// ---- Pages ---

//import Login  from "./pages/Login/login";
const Login = lazy(() => import("./pages/Login/login"));

//import Index from "./pages/Index";
const Index = lazy(() => import("./pages/Index"));

//import Error from "./pages/ErrorPage/error";
const Error = lazy(() => import("./pages/ErrorPage/error"));

//---- Other ---
import { ChatProvider } from "./context/chatProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loadUser } from "./store/slices/auth/AuthThunks";

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
								<ChatProvider>
									<Suspense>
										<Index />
									</Suspense>
								</ChatProvider>
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
