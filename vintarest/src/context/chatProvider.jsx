import { useState } from "react";
import { ChatContext } from "./chatContext";
import { ChatList } from "../components/chat/chatList";
import { Chat } from "../components/chat/chat";

export const ChatProvider = ({ children }) => {
	const [chatState, setChatState] = useState({ 
        code: "" 
    });

	const handleChatList = () => {
		setChatState({
			...chatState,
			code: (
				<>
					<ChatList />
				</>
			)
		});
	};

	const handleOpenFriendChat = () => {
		setChatState({
			...chatState,
			code: (
				<>
					<Chat />
				</>
			),
		});
	};

	const closeChat = () => {
		setChatState({ ...chatState, code: "" });
	};

	return (
		<ChatContext.Provider
			value={{ chatState, setChatState, handleChatList, handleOpenFriendChat, closeChat }}
		>
			{children}
		</ChatContext.Provider>
	);
};
