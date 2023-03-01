export const FriendChat = ({user, message}) => {
	return (
		<>
			<div className="font-inter text-primary-dark flex">
				<img
					src="src/assets/person-circle.svg"
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
