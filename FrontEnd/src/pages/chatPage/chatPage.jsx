import ChatList from "../../components/chat/chatList";
import Chat from "../../components/chat/chat";
import { useSelector } from "react-redux";

export default function ChatPage() {
	const ChatsSlice = useSelector((state) => state.ChatsSlice);

	const handleChats = () => {
		if (ChatsSlice.chatsList == null) return <></>;

		const users = JSON.parse(JSON.stringify(ChatsSlice.chatsList));

		const chats = [...Object.values(users)].map((element, index) => {
			return (
				<div
					key={index}
					className={`${
						ChatsSlice.currentChat == element.user ? "block" : "hidden"
					} h-full absolute top-0 left-0`}
				>
					<Chat user={element.user} id={element.id} />
				</div>
			);
		});

		return chats;
	};

	return (
		<>
			<div className="h-full w-full relative">
				<div className="h-full top-0 left-0">
					<ChatList />
				</div>

				<div className="h-full absolute top-0 left-0 z-50">{handleChats()}</div>
			</div>
		</>
	);
}
