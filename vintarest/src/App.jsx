import { Navbar } from "./components/shared/navbar";
import { ImageLayout } from "./components/shared/imagelayout";
import { ImageSelected } from "./components/shared/imageSelected";
import { ChatList } from "./components/chat/chatList";
import { Chat } from "./components/chat/chat";
import { Login } from "./pages/Login/login";

function App() {
	
	return (
		<>
			<div className="w-full h-full bg-primary-light">
				<ImageSelected />
			</div>
		</>
	);
}

export default App;
