import userIcon from "../../assets/person-circle.svg"

export const FriendBubble = ({messageList, user}) => {

	const message = [...Array(1)].map((x, i) => (
		<div key={i} className="my-1">
			<div
				className="
                    bg-secondary-highlight text-primary-dark
                    min-h-[40px] max-w-[288px] rounded-2xl
					flex place-items-center"
			>
				<p className="px-4 py-2 break-words w-full">
				{messageList} 
				</p>
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
