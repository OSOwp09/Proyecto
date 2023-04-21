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
import { Home } from "./pages/home/home";
import { User } from "./pages/User/user";
import { Error } from "./pages/ErrorPage/error";

//---- Other ---
import { ChatProvider } from "./context/chatProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loadUser } from "./store/slices/auth/AuthThunks";

function App() {
	document.body.classList.add("bg-primary-light");
	const dispatch = useDispatch();
	const [loadApp, setLoadApp] = useState(<></>);
	
	useEffect(() => {
		onAuthStateChanged(auth, () => {
			auth.currentUser ? dispatch(loadUser(auth.currentUser.email)):"";
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
			<div className="font-inter">
				{loadApp}
			</div>
		</>
	);
}

export default App;
