import { FriendBubble } from "./friendChatBubble";
import { OurBubble } from "./ourChatBubble";

export const Chat = () => {
	
	const friendBubble = [...Array(1)].map((x, i) => (
		<>
			<FriendBubble />
		</>
	));

	const ourBubble = [...Array(1)].map((x, i) => (
		<>
			<div className="flex place-content-end">
				<OurBubble />
			</div>
		</>
	));

	return (
		<>
			<div
				id="container"
				className="
                bg-secondary-light
                h-[672px] w-[360px] rounded-2xl
                flex flex-col
                drop-shadow-xl
                font-inter text-primary-dark"
			>
				<div className="flex">
					<div id="arrow" className="place-self-center w-auto pl-12">
						<div id="click-area" className="h-8 w-8 flex place-content-center">
							<img
								src="src/assets/arrow.svg"
								alt=""
								className="rotate-90 w-4"
							/>
						</div>
					</div>
					<h1
						id="title"
						className=" 
                        font-semibold text-base 
                        my-6 pr-[72px] w-full
                        text-center"
					>
						User1
					</h1>
				</div>

				<div id="chats" className="h-full mx-2 overflow-auto border">
					{friendBubble}
					{ourBubble}
				</div>
				<div
					id="message-input"
					className="border border-primary-dark rounded-full 
                    h-8 text-base 
                    flex place-items-center
                    mx-4 my-2"
				>
					<img
						src="src/assets/heart-fill-dark.svg"
						alt=""
						className="h-4 mx-2"
					/>
					<input
						type="text"
						placeholder="Send a message"
						className="text-base bg-transparent rounded-full w-full"
					/>
					<img
						src="src/assets/send.svg"
						alt=""
						className="h-4 mx-2 rotate-45"
					/>
				</div>
			</div>
		</>
	);
};
