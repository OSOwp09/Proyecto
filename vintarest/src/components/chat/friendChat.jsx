import { ChatContext } from "../../context/chatContext";
import friendPhoto from "../../assets/person-circle.svg"
import { useContext } from "react";

export const FriendChat = ({user, message}) => {
	const{handleOpenFriendChat} = useContext(ChatContext)

	return (
		<>
			<div
			onClick={()=> handleOpenFriendChat()}
			className="font-inter text-primary-dark flex">
				<img
					src={friendPhoto}
					alt=""
					className="w-[32px] mx-1"
				/>
				<div className="w-auto max-w-[196px] place-self-start">
					<h1 className="text-sm font-semibold">
						{user}
					</h1>
					<div></div>
					<div className="flex place-items-center gap-2">
						<p className="text-xs">{message}</p>
					</div>
				</div>
			</div>
		</>
	);
};
