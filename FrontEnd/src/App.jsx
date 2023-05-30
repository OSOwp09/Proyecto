// --- components ---

import { Navbar } from "./components/shared/navbar";
import { ImageLayout } from "./components/shared/imagelayout";
import { ImageSelected } from "./components/shared/imageSelected";
import { ChatList } from "./components/chat/chatList";
import { Chat } from "./components/chat/chat";
import { OptionsCard } from "./components/shared/options";
import { UserCard } from "./components/userPage/userCard";

// ---- Pages ---

import { Login } from "./pages/Login/login";
import { Index } from "./pages/Index";
import { Error } from "./pages/ErrorPage/error";

//---- Other ---
import { ChatProvider } from "./context/chatProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loadUser } from "./store/slices/auth/AuthThunks";
import { FindUserByEmail } from "./api/Api";
import { FinishCreationOfUser } from "./components/googleUser/finishCreationOfUser";

function App() {
	document.body.classList.add("bg-primary-light");
	const dispatch = useDispatch();

	const [loadApp, setLoadApp] = useState(<></>);

	const load = async () => {
		dispatch(loadUser(auth.currentUser.email));

		setLoadApp(
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login/*" element={<Login />} />
					<Route
						path="/home/*"
						element={
							<ChatProvider>
								<Index />
							</ChatProvider>
						}
					/>
					<Route path="*" element={<Error />} />
					<Route path="/Error404" element={<Error />} />
				</Routes>
			</Router>
		);
	};

	useEffect(() => {
		onAuthStateChanged(auth, async () => {
			if (auth?.currentUser?.email) {
				try {
					console.log("object");
					await FindUserByEmail.get("", {
						params: {
							email: auth.currentUser.email,
						},
					});
					load();
					return;
				} catch (error) {
					const handdleContinue = () => {
						load();
						return;
					};
					setLoadApp(
						<>
							<FinishCreationOfUser
								handdleContinue={handdleContinue}
								email={auth.currentUser.email}
							/>
						</>
					);
					return;
				}
			}

			setLoadApp(
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login/*" element={<Login />} />
					<Route
						path="/home/*"
						element={
							<ChatProvider>
								<Index />
							</ChatProvider>
						}
					/>
					<Route path="*" element={<Error />} />
					<Route path="/Error404" element={<Error />} />
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
