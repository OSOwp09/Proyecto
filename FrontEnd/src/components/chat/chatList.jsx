import { motion } from "framer-motion";
import { FriendChat } from "./friendChat";
import searchIcon from "../../assets/search.svg";
import styles from "./chat.module.css";
import { ListUsersApi } from "../../api/Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ChatList = () => {
	const [chats, setChats] = useState();
	const fetchChatList = async () => {
		try {
			const { data } = await ListUsersApi.get("");
			setChats(data.usuarios);
			console.log(data.usuarios);
		} catch (error) {}
	};
	useEffect(() => {
		fetchChatList();
	}, []);

	const userInfo = useSelector((state) => state.auth);

	const [chatElement, setChatElement] = useState();
	useEffect(() => {
		if (chats) {
			const chat = [...Array(chats.length)].map((x, i) => {
				if (chats[i]._id == userInfo.uid) return;
				return (
					<motion.div whileHover={{ scale: 1.01 }}>
						<div className="mb-2 rounded-2xl /hover:border /hover:py-1 /hover:px-1 border-primary-dark">
							<FriendChat
								user={chats[i].user}
								//message={chats[i].chats[0]}
								message=""
								id={chats[i]._id}
							/>
						</div>
					</motion.div>
				);
			});
			setChatElement(chat);
		}
	}, [chats]);

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
					{chatElement}
				</div>
				<div
					id="search-input"
					className={`border border-primary-dark rounded-full 
                    h-8 text-base 
                    flex
                    mx-4 my-2
					`}
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
