import styles from "../shared/styles.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { searchPublications } from "../../store/slices/filterSearch/FilterThunks";

import { ChatContext } from "../../context/chatContext";

import logo from "../../assets/Logo.svg";
import search from "../../assets/search.svg";
import chatIcon from "../../assets/chat-square-dots-fill.svg";
import usericon from "../../assets/person-circle.svg";
import arrow from "../../assets/arrow.svg";
import closeIcon from "../../assets/x-circle.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { OptionsCard } from "./options";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
	const [navbar, setNavbar] = useState("hidden"); // navbar visibility controller
	const [login, setLogin] = useState("hidden");

	const { handleChatList, chatState, closeChat } = useContext(ChatContext);
	const navigate = useNavigate();
	const handdleOpenCloseChat = () => {
		chatState.code != "" ? closeChat() : handleChatList();
	};

	const [options, setOptions] = useState(false); // logout menu visibility controller

	//controll navbar visibily depending if the user is loged and the path
	useEffect(() => {
		location.pathname == "/Error404" ? setNavbar("hidden"):setNavbar("block")
	}, [location.pathname]);

	/*controll navbar menu and login btn 
	visibily depending if the user is loged*/
	useEffect(() => {
		onAuthStateChanged(auth, () => {
			auth.currentUser ? setLogin(true) : setLogin(false);
		});
	}, []);


	//Search
	const [wordsInput, setWordsInput] = useState("")
	const dispatch = useDispatch();

	const handdleSearchInput = (words) => {
		navigate("/home")
		if (words.split(" ").slice(-1)[0] == "") {
			
			dispatch(searchPublications(words.replace(/.$/,'')));
			return
		}
		dispatch(searchPublications(words));
	}

	return (
		<>
			<div
				id="navbar-container"
				className={`
				${navbar}
                h-[48px] w-auto 
                flex place-items-center 
				max-sm:gap-1 max-sm:px-2
				sm:gap-2 sm:px-4
				md:gap-4 md:px-6
				lg:gap-6 lg:px-8

                bg-secondary-light
                font-inter select-none
                `}
			>
				<img
					id="logo"
					src={logo}
					className="
					h-[24px]
					mx-3"
					onClick={() => {navigate("/home"), dispatch(searchPublications(""))}}
				/>

				<div
					id="search"
					className="
                    flex place-items-center gap-4
                    w-screen h-[32px]
                    bg-secondary-highlight
                    rounded-2xl"
				>
					<img src={search} alt="" className="h-[14px] ml-4" 
					onClick={()=>handdleSearchInput(wordsInput)}/>
					<input
						onChange={(e)=> setWordsInput(e.target.value)}
						onKeyDown={(e)=> e.key == 'Enter' ? handdleSearchInput(wordsInput):""}
						value={wordsInput}
						type="text"
						placeholder="Search"
						className="
						text-sm
                            w-full h-[32px]
                            bg-secondary-highlight 
                            rounded-2xl 
                            placeholder:text-secondary-dark
                            text-primary-dark
							outline-none pr-4"
					/>
				</div>

				<div
					id="login"
					onClick={() => navigate("/login")}
					className={`ml-3 
					text-secondary-red
					border rounded-2xl
					border-secondary-red
					hover:border-primary-red
					hover:bg-primary-red 
					hover:text-secondary-light
					hover:shadow-md
					${login}
					${login ? "hidden" : "block"}`}
				>
					<button className="w-[56px] py-1 text-sm">Log in</button>
				</div>

				<div
					id="menu"
					className={`
					h-full
					${login}
					${login ? "flex place-items-center gap-2" : "hidden"}`}
				>
					<motion.div
						id="chat-icon-container"
						onClick={() => handdleOpenCloseChat()}
						className={`h-[60%] w-[30px]
						flex place-items-center place-content-center
						${chatState.code != "" ? styles.pressed : styles.navbtn}`}
						initial={"tapnt"}
						whileTap={"tap"}
					>
						<motion.div
							variants={{
								tap: { scale: 0.9 },
								tapnt: { scale: 1 },
							}}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<div id="chat-image" className="flex-none">
								<img
									src={chatState.code != "" ? closeIcon : chatIcon}
									alt=""
									className="h-[20px]"
								/>
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						id="user-icon-container"
						className={`h-[60%] w-[30px]
					flex place-items-center place-content-center
					${
						location.pathname == "/home/user" ||
						location.pathname == "/home/upload"
							? styles.pressed
							: styles.navbtn
					}`}
						onClick={() => navigate("user")}
						initial={"tapnt"}
						whileTap={"tap"}
					>
						<motion.div
							variants={{
								tap: { scale: 0.9 },
								tapnt: { scale: 1 },
							}}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<div
								id="user-image-container"
								className="
                        w-[20px] h-[20px] flex-none
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
					</motion.div>

					<motion.div
						onClick={() => setOptions(!options)}
						id="options-icon-container"
						className={`h-[60%] w-[30px]
						flex place-items-center place-content-center
						${options ? styles.pressed : styles.navbtn}`}
						animate={options ? "open" : "closed"}
						whileTap={"tap"}
					>
						<motion.div
							variants={{
								open: { rotate: 180 },
								close: { rotate: 0 },
								tap: { scale: 0.8 },
							}}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
						>
							<div id="arrow" className="flex-none mx-2">
								<img src={arrow} alt="" className="h-2" />
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>

			<motion.div
				className={`
				${options ? "block" : "hidden"}
				absolute right-1 mt-1
				shadow-lg
				rounded-full`}
			>
				<OptionsCard />
			</motion.div>
		</>
	);
};