import { motion } from "framer-motion";
import { FriendChat } from "./friendChat";
import searchIcon from "../../assets/search.svg";

export const ChatList = () => {
	const chat = [...Array(4)].map((x, i) => (
		<motion.div
		whileHover={{ scale: 1.01 }}>
			<div className="mb-2 rounded-2xl /hover:border /hover:py-1 /hover:px-1 border-primary-dark">
				<FriendChat user="User" message="Hey" />
			</div>
		</motion.div>
	));

	return (
		<>
			<div
				id="container"
				className="
                bg-secondary-light
				h-[calc(100vh-88px)]
                max-h-[calc(672px-72px)] w-[360px] rounded-2xl
				calc(100vh-48px)
                flex flex-col
                drop-shadow-xl
                font-inter text-primary-dark"
			>
				<h1
					id="title"
					className="place-self-center 
                    font-semibold text-base
                    my-6"
				>
					Chats
				</h1>
				<div id="chats" className="h-full mx-6 overflow-auto overflow-x-hidden">
					{chat}
				</div>
				<div
					id="search-input"
					className="border border-primary-dark rounded-full 
                    h-8 text-base 
                    flex
                    mx-4 my-2"
				>
					<img src={searchIcon} alt="" className="w-4 mx-2" />
					<input
						type="text"
						placeholder="Search chat"
						className="text-base bg-transparent rounded-full w-full"
					/>
				</div>
			</div>
		</>
	);
};
