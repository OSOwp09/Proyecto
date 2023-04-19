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

function App() {
	document.body.classList.add("bg-primary-light");

	return (
		<>
			<div className="font-inter">
				<Router>
					<Routes>
						<Route path="/" element={<Login/>} />
						<Route path="/login/*" element={<Login/>} />
						<Route path="/home/*" element={
						<ChatProvider>
							<Index/>
						</ChatProvider>
						}/>
						<Route path="*" element={<Error />} />
					</Routes>
				</Router>
			</div>
		</>
	);
}

export default App;
