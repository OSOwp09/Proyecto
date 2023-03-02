import { Navbar } from "./components/shared/navbar";
import { ImageLayout } from "./components/shared/imagelayout";
import { ImageSelected } from "./components/shared/imageSelected";
import { ChatList } from "./components/chat/chatList";
import { Chat } from "./components/chat/chat";
import { Login } from "./pages/Login/login";
import { RegisterCard } from "./components/login/registerCard";
import { OptionsCard } from "./components/shared/options";
import { UserCard } from "./components/userPage/userCard";

function App() {
	
	return (
		<>
			<div className="w-full h-full bg-primary-light">
				<RegisterCard />
			</div>
		</>
	);
}

export default App;
