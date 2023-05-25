import userIcon from "../../assets/person-circle.svg"

export const FriendBubble = (messageList) => {
	// const array = [messageList]

	// console.log(messageList.messageList);

	const message = [...Array(1)].map((x, i) => (
		<div className="my-1">
			<div
				className="
                    bg-secondary-highlight text-primary-dark
                    min-h-[48px] max-w-[288px] rounded-2xl"
			>
				<h1 className="px-4 py-3">
					Hey, how a a a a a a a a a a a a a a a a d r u?
				</h1>
			</div>
		</div>
	));
	return (
		<>
			<div className="font-inter">
				<h1 className="ml-10 text-secondary-dark text-xs">User1</h1>
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
