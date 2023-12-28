
import friendPhoto from "../../assets/person-circle.svg";

import {
	UpdateCurrentChat,
	UpdateChatList,
} from "../../store/slices/chats/chatsThunk";
import { useDispatch, useSelector } from "react-redux";

export const FriendChat = ({ user, message, id }) => {
	const dispatch = useDispatch();
	const ChatsSlice = useSelector((state) => state.ChatsSlice);

	const handleUpdateChatList = (user, id) => {
		if (ChatsSlice.chatsList != null) {
			if (ChatsSlice.chatsList.hasOwnProperty(user)) return;
		} else {
			const newUser = {};
			newUser[user] = {
				user: user,
				id: id,
			};
			dispatch(UpdateChatList(newUser));
			return;
		}

		const currentChats = JSON.parse(JSON.stringify(ChatsSlice.chatsList));

		currentChats[user] = {
			user: user,
			id: id,
		};

		dispatch(UpdateChatList(currentChats));
		return;
	};

	return (
		<>
			<div
				onClick={() => {
					dispatch(UpdateCurrentChat(user));
					handleUpdateChatList(user, id);
				}}
				className="font-inter text-primary-dark flex gap-2 "
			>
				<img src={friendPhoto} alt="" className="w-[32px] mx-1" />
				<div
					className="w-auto max-w-[196px] h-[36px]
				place-self-start
				flex flex-col place-content-center"
				>
					<h1 className="text-sm font-semibold">{user}</h1>
					<div
						className={` ${message == "" ? "hidden" : "block"}
					flex place-items-center gap-2`}
					>
						<p className="text-xs w-[200px] truncate">{message}</p>
					</div>
				</div>
			</div>
		</>
	);
};
