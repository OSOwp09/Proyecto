import { ChatContext } from "../../context/chat/chatContext";
import friendPhoto from "../../assets/person-circle.svg";
import { useContext } from "react";

export const FriendChat = ({ user, message, id }) => {
	const { handleOpenFriendChat, setSelectedChat } = useContext(ChatContext);

	return (
		<>
			<div
				onClick={() => {
					handleOpenFriendChat(user, id);
					setSelectedChat(id);
				}}
				className="font-inter text-primary-dark flex"
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
