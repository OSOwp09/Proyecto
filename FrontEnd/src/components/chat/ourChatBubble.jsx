export const OurBubble = ({ messageList }) => {
	const message = [...Array(1)].map((x, i) => (
		<div key={i} className="my-1">
			<div
				className="
                    bg-transparent border border-primary-dark text-primary-dark
                    min-h-[40px] max-w-[288px] rounded-2xl
					flex place-items-center"
			>
				<p className="px-4 py-2 break-words w-full ">
					{messageList.text ? messageList.text : messageList}
				</p>
			</div>
		</div>
	));

	return (
		<>
			<div className="font-inter">
				<div className="flex place-content-end ">
					<div>{message}</div>
				</div>
			</div>
		</>
	);
};
