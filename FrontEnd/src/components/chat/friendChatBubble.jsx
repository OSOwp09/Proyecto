import userIcon from "../../assets/person-circle.svg"

export const FriendBubble = ({messageList, user}) => {
	// const array = [messageList]

	// console.log(messageList.messageList);

	const message = [...Array(1)].map((x, i) => (
		<div key={i} className="my-1">
			<div
				className="
                    bg-secondary-highlight text-primary-dark
                    min-h-[40px] max-w-[288px] rounded-2xl
					flex place-items-center"
			>
				<h1 className="px-4 py-2">
				{messageList}
				</h1>
				{/* <p className="text-xs text-secondary-dark">10:00pm</p> */}
			</div>
		</div>
	));
	return (
		<>
			<div className="font-inter">
				<div className="flex place-items-start">
					<div>{message}</div>
				</div>
			</div>
		</>
	);
};
