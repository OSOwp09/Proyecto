import { lazy, Suspense } from "react";

import { useState } from "react";
import { ChatContext } from "./chatContext";
//import { ChatList } from "../components/chat/chatList";
const ChatList = lazy(() => import("../components/chat/chatList"));

//import Chat from "../components/chat/chat";
const Chat = lazy(() => import("../components/chat/chat"));

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
					<Suspense>
						<ChatList />
					</Suspense>
				</>
			),
		});
	};

	const handleOpenFriendChat = (user, id) => {
		setChatState({
			...chatState,
			code: (
				<>
					<Suspense>
						<Chat user={user} id={id} />
					</Suspense>
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
				selectedChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
