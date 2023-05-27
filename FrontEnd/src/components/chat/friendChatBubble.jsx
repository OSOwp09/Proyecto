import userIcon from "../../assets/person-circle.svg"

export const FriendBubble = ({messageList, user}) => {
	// const array = [messageList]

	// console.log(messageList.messageList);

	const message = [...Array(1)].map((x, i) => (
		<div key={i} className="my-1">
			<div
				className="
                    bg-secondary-highlight text-primary-dark
                    min-h-[48px] max-w-[288px] rounded-2xl"
			>
				<h1 className="px-4 py-3">
				{messageList}
				</h1>
			</div>
		</div>
	));
	return (
		<>
			<div className="font-inter">
				<h1 className="ml-10 text-secondary-dark text-xs">{user}</h1>
				<div className="flex place-items-start">
					<img
						src={userIcon}
						alt=""
						className="h-8 mt-2 mr-2"
					/>
					<div>{message}</div>
				</div>
			</div>
		</>
	);
};
