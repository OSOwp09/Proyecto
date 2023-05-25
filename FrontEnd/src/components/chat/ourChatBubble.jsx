export const OurBubble = () => {
	
	const message = [...Array(1)].map((x, i) => (
		<div className="my-1">
			<div
				className="
                    bg-transparent border border-primary-dark text-primary-dark
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
				<h1 className="ml-64 text-secondary-dark text-xs">You</h1>
				<div className="flex place-items-start">
					<div>{message}</div>
				</div>
			</div>
		</>
	);
};
