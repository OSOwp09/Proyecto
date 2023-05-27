import { motion } from "framer-motion";
import { FriendBubble } from "./friendChatBubble";
import { OurBubble } from "./ourChatBubble";
import { ChatContext } from "../../context/chatContext";
import { ChatLoader } from "../loaders/chatLoader";

import heart from "../../assets/heart-fill-dark.svg";
import send from "../../assets/send.svg";
import backArrow from "../../assets/arrow.svg";
import { useContext, useEffect, useRef } from "react";
import { FetchChat, NewMessage } from "../../api/Api";

import styles from "./chat.module.css";

//--------- socket stuff ------------

import { io } from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//const ENDPOINT = "" // Railway
const ENDPOINT = "http://localhost:4000"; // local
var socket, selectedChatCompare;

export const Chat = ({ user, id }) => {
	const { handleChatList, selectedChat, setSelectedChat } =
		useContext(ChatContext);

	const divScrollRef = useRef(null);
	const scrollToBottom = () => {
		divScrollRef.current.scroll({
			top: 99999,
		});
	};

	//-------------- mesages fetch and send --------------------

	const userInfo = useSelector((state) => state.auth);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newMessage, setNewMessage] = useState();

	const handdleInputChange = (e) => {
		setNewMessage(e.target.value);
	};

	const fetchMessages = async () => {
		if (!selectedChat) return;

		const resp = await FetchChat.get("", {
			params: {
				userId1: userInfo.uid,
				userId2: id,
			},
		});

		const messagesList = resp.data.chat.messages;
		console.log(resp.data.chat._id);
		setMessages(messagesList?.reverse());
		setLoading(false);
		socket.emit("join chat", `${userInfo.uid}-room-${id}`);
	};

	const sendMessage = async () => {
		if (newMessage) {

			setNewMessage("");
			const resp = await NewMessage.post("", {
				userId1: userInfo.uid,
				userId2: id,
				message: {
					user: userInfo.user,
					text: newMessage,
				},
			});
			
			socket.emit("new message", {
				room:`${id}-room-${userInfo.uid}`,
				message: newMessage,
			});

			setMessages([
				...messages,
				{
					user: userInfo.user,
					text: resp.data.chat.messages[0],
				},
			]);
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	//--------------------------------------------------------

	//-------------- sockets --------------------------------

	const [socketConnected, setSocketConnected] = useState(false);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", userInfo);
		socket.on("connection", () => setSocketConnected(true));
		console.log("selected", selectedChat);
	}, []);

	useEffect(() => {
		fetchMessages();

		selectedChatCompare = selectedChat;
		// eslint-disable-next-line
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			console.log("mensaje del socket", newMessageRecieved);

			setMessages([...messages, {
				user: userInfo.uid,
				text: newMessageRecieved
			}]);

			// if (
			// 	!selectedChatCompare || // if chat is not selected or doesn't match current chat
			// 	selectedChatCompare !== newMessageRecieved.chat._id
			// ) {
			// 	if (!notification.includes(newMessageRecieved)) {
			// 		setNotification([newMessageRecieved, ...notification]);
			// 		setFetchAgain(!fetchAgain);
			// 	}
			// } else {
			// 	setMessages([...messages, newMessageRecieved]);
			// }
		});
	});

	

	//--------------------------------------------------------

	var ourMessage = [];
	var friendMessage = [];

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
						<div
							onClick={() => {
								handleChatList();
								setSelectedChat("");
							}}
							id="arrow"
							className="place-self-center w-auto mx-4 "
						>
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
							{user}
						</h1>
					</div>
				</div>

				<div
					ref={divScrollRef}
					id="messages"
					onClick={() => {
						scrollToBottom(), console.log("paArriba");
					}}
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
									{messages.map((x, i) => {
										//console.log(i, messages.length - 1);
										if (messages[i].user == userInfo.user) {
											scrollToBottom();
											ourMessage.unshift(messages[i].text);
											return (
												<>
													<div key={i} className="flex place-content-end">
														<OurBubble messageList={messages[i].text}/>
													</div>
												</>
											);
										} else {
											friendMessage.unshift(messages[i].text);

											return (
												<>
													<div key={i}>
														<FriendBubble messageList={messages[i].text} user={user}/>
													</div>
												</>
											);
										}
									})}
								</>
							) : (
								<></>
							)}
						</>
					)}
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
						value={newMessage}
						onChange={(e) => handdleInputChange(e)}
						placeholder="Send a message"
						className="text-base bg-transparent rounded-full w-full
							pl-2
							outline-none"
					/>

					<motion.div
						onClick={() => sendMessage()}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<img src={send} alt="" className="h-4 mr-4 rotate-45" />
					</motion.div>
				</div>
			</div>
		</>
	);
};
