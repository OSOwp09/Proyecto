import styles from "../shared/styles.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { ChatContext } from "../../context/chatContext";

import logo from "../../assets/Logo.svg";
import search from "../../assets/search.svg";
import chatIcon from "../../assets/chat-square-dots-fill.svg";
import usericon from "../../assets/person-circle.svg";
import arrow from "../../assets/arrow.svg";
import closeIcon from "../../assets/x-circle.svg";

import { useContext } from "react";

export const Navbar = () => {
	const { handleChatList, chatState, closeChat } = useContext(ChatContext);
	const navigate = useNavigate();
	const handdleOpenCloseChat = () => {
		chatState.code != "" ? closeChat() : handleChatList();
	};

	return (
		<>
			<div
				id="navbar-container"
				className="
                h-[80px] w-auto 
                flex place-items-center gap-2
                bg-secondary-light
                font-inter select-none
                px-4"
			>
				<img
					id="logo"
					src={logo}
					className="
					w-[40px] h-[40px]"
					onClick={() => navigate("home")}
				/>

				<div
					id="search"
					className="
                    flex place-items-center gap-4
                    w-screen h-[48px]
                    bg-secondary-highlight
                    rounded-2xl"
				>
					<img src={search} alt="" className="h-[16px] ml-4" />
					<input
						type="text"
						placeholder="Search"
						className="
                            w-full h-[48px]
                            bg-secondary-highlight 
                            rounded-2xl 
                            placeholder:text-secondary-dark
                            text-primary-dark
							outline-none"
					/>
				</div>

				<div
					id="chat-icon-container"
					onClick={() => handdleOpenCloseChat()}
					className={`h-[60%] w-[40px]
					flex place-items-center place-content-center
					${chatState.code != "" ? styles.pressed : styles.navbtn}`}
				>
					<motion.div
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
						
					>
						<div id="chat-image" className="flex-none">
							<img
								src={chatState.code != "" ? closeIcon : chatIcon}
								alt=""
								className="h-[24px]"
							/>
						</div>
					</motion.div>
				</div>
				<div
					id="user-icon-container"
					className={`h-[60%] w-[40px]
					flex place-items-center place-content-center
					${
						location.pathname == "/index/user" ||
						location.pathname == "/index/upload"
							? styles.pressed
							: styles.navbtn
					}`}
					onClick={() => navigate("user")}
				>
					<motion.div
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<div
							id="user-image-container"
							className="
                        w-[24px] h-[24px] flex-none
                        rounded-full "
						>
							<img
								src={usericon}
								className="
                            w-[inherit] h-[inherit]
                            rounded-[inherit]
                            object-cover"
							/>
						</div>
					</motion.div>
				</div>
				<div
					id="chat-icon-container"
					className={`h-[60%] 
					flex place-items-center place-content-center
					${styles.navbtn}`}
				>
					<div id="arrow" className="flex-none mx-2">
						<img src={arrow} alt="" className="h-2" />
					</div>
				</div>
			</div>
		</>
	);
};
