import { motion } from "framer-motion";
import { FriendBubble } from "./friendChatBubble";
import { OurBubble } from "./ourChatBubble";
import heart from "../../assets/heart-fill-dark.svg";
import send from "../../assets/send.svg";
import backArrow from "../../assets/arrow.svg";

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
                h-[calc(100vh-88px)]
                max-h-[calc(672px-72px)] w-[360px] rounded-2xl
                flex flex-col
                drop-shadow-xl
                font-inter text-primary-dark"
			>
				<div
					id="userContainer"
					className="h-auto w-auto drop-shadow-sm rounded-2xl
					border border-secondary-light"
				>
					<div className="flex">
						<div id="arrow" className="place-self-center w-auto mx-4 ">
							<div
								id="click-area"
								className="h-8 w-8 flex place-content-center"
							>
								<img src={backArrow} alt="" className="rotate-90 w-4" />
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
				</div>

				<div id="chats" className="h-full mx-2 overflow-auto">
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
					<motion.div
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<img src={heart} alt="" className="h-4 mx-2" />
					</motion.div>
					<input
						type="text"
						placeholder="Send a message"
						className="text-base bg-transparent rounded-full w-full
						outline-none
						pl-2"
					/>
					<motion.div
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<img src={send} alt="" className="h-4 mx-4 rotate-45" />
					</motion.div>
				</div>
			</div>
		</>
	);
};
