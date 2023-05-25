import { useState } from "react";
import { ChatContext } from "./chatContext";
import { ChatList } from "../components/chat/chatList";
import { Chat } from "../components/chat/chat";

export const ChatProvider = ({ children }) => {
	const [selectedChat, setSelectedChat] = useState();

	const [chatState, setChatState] = useState({
		code: "",
	});

	const handleChatList = () => {
		setChatState({
			...chatState,
			code: (
				<>
					<ChatList />
				</>
			),
		});
	};

	const handleOpenFriendChat = (user, id) => {
		setChatState({
			...chatState,
			code: (
				<>
					<Chat user={user} id={id}/>
				</>
			),
		});
	};

	const closeChat = () => {
		setChatState({ ...chatState, code: "" });
	};

	return (
		<ChatContext.Provider
			value={{
				chatState,
				setChatState,
				handleChatList,
				handleOpenFriendChat,
				closeChat,
				setSelectedChat,
				selectedChat
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
