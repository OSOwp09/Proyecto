import styles from "../shared/styles.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { searchPublications } from "../../store/slices/filterSearch/FilterThunks";
import { openOptions } from "../../store/slices/navbarOptions/navbarOptionsThunks";
import { OpenChat, CloseChat } from "../../store/slices/chats/chatsThunk";
import { MobileShareButton } from "../shared/publicationOptions";
import { MobileThreeDots } from "../shared/publicationOptions";
import { MobileCommentList } from "../shared/publicationOptions";

import logo from "../../assets/Logo.svg";
import search from "../../assets/search.svg";
import chatIcon from "../../assets/chat-square-dots-fill.svg";
import usericon from "../../assets/person-circle.svg";
import arrow from "../../assets/arrow.svg";
import closeIcon from "../../assets/x-circle.svg";
import homeIcon from "../../assets/homelogo.svg";
import threeDotsIcon from "../../assets/three-dots.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { OptionsCard } from "./options";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
	const [navbar, setNavbar] = useState("hidden"); // navbar visibility controller
	const [login, setLogin] = useState("hidden");

	const navigate = useNavigate();
	const ChatsSlice = useSelector((state) => state.ChatsSlice);
	const handdleOpenCloseChat = () => {
		ChatsSlice.isChatOpen ? dispatch(CloseChat()):dispatch(OpenChat())
	};

	const [options, setOptions] = useState(false); // logout menu visibility controller

	//controll navbar visibily depending if the user is loged and the path
	useEffect(() => {
		location.pathname == "/Error404" ? setNavbar("hidden") : setNavbar("block");
	}, [location.pathname]);

	/*controll navbar menu and login btn 
	visibily depending if the user is loged*/
	useEffect(() => {
		onAuthStateChanged(auth, () => {
			auth.currentUser ? setLogin(true) : setLogin(false);
		});
	}, []);

	//Search
	const [wordsInput, setWordsInput] = useState("");
	const dispatch = useDispatch();

	const handdleSearchInput = (words) => {
		navigate("/home");
		if (words.split(" ").slice(-1)[0] == "") {
			dispatch(searchPublications(words.replace(/.$/, "")));
			return;
		}
		dispatch(searchPublications(words));
	};

	//Desktop
	const desktopNavbar = () => {
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
				
                drop-shadow-md`}
				>
					<img
						id="logo"
						src={logo}
						className="
					h-[24px]
					mx-3"
						onClick={() => {
							navigate("/home"), dispatch(searchPublications(""));
						}}
					/>

					<div
						id="search"
						className="
                    flex place-items-center gap-4
                    w-screen h-[32px]
                    bg-secondary-highlight
                    rounded-2xl"
					>
						<img
							src={search}
							alt=""
							className="h-[14px] ml-4"
							onClick={() => handdleSearchInput(wordsInput)}
						/>
						<input
							onChange={(e) => setWordsInput(e.target.value)}
							onKeyDown={(e) =>
								e.key == "Enter" ? handdleSearchInput(wordsInput) : ""
							}
							value={wordsInput}
							type="text"
							placeholder="Search"
							className="
						text-sm
                            w-full h-[32px]
                            bg-secondary-highlight rounded-r-2xl
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
						${ChatsSlice.isChatOpen != "" ? styles.pressed : styles.navbtn}`}
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
										src={ChatsSlice.isChatOpen!= "" ? closeIcon : chatIcon}
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
							id="options-icon-container"
							className={`
							group relative
							h-[60%] w-[30px]
							flex place-items-center place-content-center
							transition-all
						
						${options ? styles.pressed : styles.navbtn}`}
							onHoverStart={() => setOptions(true)}
							onHoverEnd={() => setOptions(false)}
						>
							<div id="arrow" className="flex-none mx-2">
								<img
									src={arrow}
									alt=""
									className="h-2 transition-all group-hover:rotate-[180deg]"
								/>
							</div>
							<div
								className="h-5 w-8 bg-transparent 
								absolute bottom-[-10px]
								hidden  group-hover:block"
							></div>
							<div
								className="h-[40px] w-[80px] bg-transparent 
								absolute bottom-[-35px] right-0
								hidden  group-hover:block"
							></div>
							<div
								className="absolute bottom-[-116px] right-[-12px]
								hidden  group-hover:block"
							>
								<OptionsCard />
							</div>
						</motion.div>
					</div>
				</div>
			</>
		);
	};

	//Mobile
	const optionsOpenedOrCLosed = useSelector((state) => state.navbarOptions);
	const shareOptions = useSelector((state) => state.shareOptions);
	const publicationsOptions = useSelector((state) => state.publicationsOptions);
	const commentsList = useSelector((state) => state.commentsList);

	const mobileNavbar = () => {
		return (
			<>
				<div className="absolute bottom-0 h-[48px] bg-secondary-light w-screen flex justify-between px-8 p-3 select-none">
					<img onClick={() => navigate("/home")} src={homeIcon} alt="" />
					<img
						onClick={() => navigate("chat")}
						src={chatIcon}
						alt=""
						className={`${login ? "block" : "hidden"}`}
					/>
					<img src={search} alt="" />
					<img
						onClick={() => navigate("user")}
						src={usericon}
						alt=""
						className={`${login ? "block" : "hidden"}`}
					/>
					<img
						onClick={() => dispatch(openOptions())}
						src={threeDotsIcon}
						alt=""
					/>
				</div>
				<div
					className={`absolute bottom-0 z-50 ${
						optionsOpenedOrCLosed.code != "" ? "block" : "hidden"
					}`}
				>
					<OptionsCard />
				</div>
				<div
					className={`absolute bottom-0 z-50 ${
						shareOptions.code != "" ? "block" : "hidden"
					}`}
				>
					<MobileShareButton />
				</div>
				<div
					className={`absolute bottom-0 z-50 ${
						publicationsOptions.code != "" ? "block" : "hidden"
					}`}
				>
					<MobileThreeDots />
				</div>

				<div
					className={`absolute bottom-0 z-50 ${
						commentsList.code != "" ? "block" : "hidden"
					}`}
				>
					<MobileCommentList />
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block sm:hidden">{mobileNavbar()}</div>
			<div className="hidden sm:block">{desktopNavbar()}</div>
		</>
	);
};
