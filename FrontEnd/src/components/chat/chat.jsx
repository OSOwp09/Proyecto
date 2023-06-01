import { motion } from "framer-motion";
import { FriendBubble } from "./friendChatBubble";
import { OurBubble } from "./ourChatBubble";
import { ChatContext } from "../../context/chatContext";
import { ChatLoader } from "../loaders/chatLoader";
import { useNavigate } from "react-router-dom";

import heart from "../../assets/heart-fill-dark.svg";
import send from "../../assets/send.svg";
import backArrow from "../../assets/arrow.svg";
import userIcon from "../../assets/person-circle.svg";

import { useContext, useEffect, useRef } from "react";
import { FetchChat, NewMessage, pathName } from "../../api/Api";

import styles from "./chat.module.css";

//--------- socket stuff ------------

import { io } from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ENDPOINT = pathName;

var socket, selectedChatCompare;

export const Chat = ({ user, id }) => {

	const navigate = useNavigate();
	const { handleChatList, selectedChat, setSelectedChat } =
		useContext(ChatContext);

	const [isScrolled, setIsScrolled] = useState(false);
	const divScrollRef = useRef(null);
	const scrollToBottom = () => {
		divScrollRef.current.scroll({
			top: 99999,
		});
		if (isScrolled == false) {
			setIsScrolled(true);
		}
	};

	//-------------- mesages fetch and send --------------------

	const userInfo = useSelector((state) => state.auth);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newMessage, setNewMessage] = useState();


	const textArea = useRef(null)
	const hanndleResizeInput = (e) => {
		e.target.style.height = "24px";
		e.target.style.height = e.target.scrollHeight + "px";
	};	

	const handdleInputChange = (e) => {
		setNewMessage(e.target.value);
		hanndleResizeInput(e);
	};

	useEffect(() => {
		setTimeout(() => {
			scrollToBottom();
		}, 200);
	}, [messages]);

	const fetchMessages = async () => {
		if (!selectedChat) return;

		const resp = await FetchChat.get("", {
			params: {
				userId1: userInfo.uid,
				userId2: id,
			},
		});

		const messagesList = resp.data.chat.messages;
		setMessages(messagesList?.reverse());
		setLoading(false);
		socket.emit("join chat", `${userInfo.uid}-room-${id}`);
	};

	const sendMessage = async () => {
		if (newMessage) {
			setNewMessage("");
			textArea.current.style.height = "24px"
			const resp = await NewMessage.post("", {
				userId1: userInfo.uid,
				userId2: id,
				message: {
					user: userInfo.user,
					text: newMessage,
				},
			});

			socket.emit("new message", {
				room: `${id}-room-${userInfo.uid}`,
				message: newMessage,
			});

			console.log("aquiiii", messages);
			if (messages == undefined) {
				setMessages([
					{
						user: userInfo.user,
						text: resp.data.chat.messages[0],
					},
				]);
				return;
			}
			setMessages([
				...messages,
				{
					user: userInfo.user,
					text: resp.data.chat.messages[0],
				},
			]);
		}
	};

	//--------------------------------------------------------

	//-------------- sockets --------------------------------

	const [socketConnected, setSocketConnected] = useState(false);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", userInfo);
		socket.on("connection", () => setSocketConnected(true));
	}, []);

	useEffect(() => {
		fetchMessages();

		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			if (messages != undefined) {
				setMessages([
					...messages,
					{
						user: userInfo.uid,
						text: newMessageRecieved,
					},
				]);
			}
		});
	});

	//--------------------------------------------------------

	var ourMessage = [];
	var friendMessage = [];

	//---------- show/hide scroll to bottom btn ---------------
	const [scrollDistance, setScrollDistance] = useState(0);
	const handleScroll = (e) => {
		setScrollDistance(
			(e.target.clientHeight + e.target.scrollTop - 1 - e.target.scrollHeight) *
				-1
		);
	};
	//--------------------------------------------------------

	const handdleUserClick = () => {
		navigate(`/home/${user}`);
	};

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
					<div
						className="
					w-full h-[70px] pl-2
					flex gap-2 place-items-center"
					>
						<div
							onClick={() => {
								handleChatList();
								setSelectedChat("");
							}}
							id="arrow"
							className="place-self-center w-auto "
						>
							<div
								id="click-area"
								className="h-8 w-8 flex place-content-center"
							>
								<img src={backArrow} alt="" className="rotate-90 w-4" />
							</div>
						</div>
						<div className="w-8"
						onClick={()=>handdleUserClick()}>
							<img src={userIcon} alt="" className="w-full" />
						</div>
						<h1
							id="title"
							className=" 
                			font-semibold text-base 
                        	/text-center"
						>
							{user}
						</h1>
					</div>
				</div>

				<div
					id="messages-container"
					ref={divScrollRef}
					onScroll={(e) => handleScroll(e)}
					className={`h-full mx-2 overflow-auto 
					${styles.scrollbar}`}
				>
					{loading ? (
						<div className="h-full w-full flex place-content-center place-items-center">
							<ChatLoader />
						</div>
					) : (
						<>
							{messages ? (
								<>
									<div className={`${isScrolled ? "visible" : "invisible"}`}>
										{messages.map((x, i) => {
											if (messages[i].user == userInfo.user) {
												ourMessage.unshift(messages[i].text);
												return (
													<>
														<div key={i} className="flex place-content-end">
															<OurBubble messageList={messages[i].text} />
														</div>
													</>
												);
											} else {
												friendMessage.unshift(messages[i].text);

												return (
													<>
														<div key={i}>
															<FriendBubble
																messageList={messages[i].text}
																user={user}
															/>
														</div>
													</>
												);
											}
										})}
									</div>
								</>
							) : (
								<></>
							)}
						</>
					)}
				</div>

				<div
					id="message-input"
					className="
					relative
					border border-primary-dark rounded-2xl 
                    h-auto text-base 
                    flex place-items-end
                    mx-4 my-2"
				>
					<div
						id="scroll-to-bottom-btn"
						className={`
						${scrollDistance >= 150 ? "block" : "hidden"}
						select-none
						absolute top-[-30px]
						w-full flex place-content-center`}
					>
						<div
							onClick={() => scrollToBottom()}
							className={`
							group
							bg-secondary-light hover:bg-secondary-dark
							border border-secondary-dark
							rounded-full
							px-5 py-2 
							transition-all 
							scale-[0.8] hover:scale-[1]`}
						>
							<svg
								width="12"
								height="7"
								viewBox="0 0 12 7"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="transition-all
								stroke-secondary-dark group-hover:stroke-secondary-light"
							>
								<path
									d="M1 1L6 6L11 1"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>
					<motion.div
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
						className="mb-1"
					>
						<img src={heart} alt="" className="h-4 mx-2" />
					</motion.div>

					<textarea
						ref={textArea}
						type="text"
						value={newMessage}
						onChange={(e) => handdleInputChange(e)}
						placeholder="Send a message"
						className={`first-line:marker:text-base bg-transparent w-full h-[24px] max-h-[120px]
							pl-2 ${styles.scrollbar}
							outline-none resize-none`}
					/>

					<motion.div
						onClick={() => sendMessage()}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
						className="mb-1"
					>
						<img src={send} alt="" className="h-4 mr-4 rotate-45" />
					</motion.div>
				</div>
			</div>
		</>
	);
};
