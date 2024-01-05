import { motion } from "framer-motion";
import { FriendChat } from "./friendChat";
import searchIcon from "../../assets/search.svg";
import styles from "./chat.module.css";
import { ListChats, LsitUsersToChat } from "../../api/Api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import userIcon from "../../assets/person-circle.svg";

export default function ChatList() {
	const [input, setInput] = useState("");
	const [chats, setChats] = useState();
	const userInfo = useSelector((state) => state.auth);
	//const [firstChatFetchs, setFirstChatFetchs] = useState(false);
	const [isMyInputFocused, setIsMyInputFocused] = useState(false);
	const ChatsSlice = useSelector((state) => state.ChatsSlice);

	/**
	 * Fetches the chats that thet current user belongs to
	 */
	const fetchChatList = async () => {
		try {
			const { data } = await ListChats.get("", {
				params: {
					userId: userInfo.uid,
				},
			});
			setChats(data.chats);
			//firstChatFetchs(true);
		} catch (error) {}
	};
	useEffect(() => {
		fetchChatList();
	}, [, ChatsSlice.currentChat]);

	/* This code is creating a list of chat elements to be displayed in the chat list component. It uses
	the `useState` hook to create a state variable `chatElement` and the `useEffect` hook to update it
	whenever the `chats` state variable changes. */
	const [chatElement, setChatElement] = useState();
	useEffect(() => {
		if (chats) {
			const chat = [...Array(chats.length)].map((x, i) => {
				if (
					chats[i].userId[0].id == userInfo.uid &&
					chats[i].userId[1].id == userInfo.uid
				)
					return;

				const lastMessage = chats[i].lastMessage?.text;
				let user;
				let id;

				if (chats[i].userId[0].id == userInfo.uid) {
					user = chats[i].userId[1].user;
					id = chats[i].userId[1].id;
				} else {
					user = chats[i].userId[0].user;
					id = chats[i].userId[0].id;
				}

				return (
					<motion.div key={i} whileHover={{ scale: 1.01 }}>
						<div className="mb-2 rounded-2xl /hover:border /hover:py-1 /hover:px-1 border-primary-dark">
							<FriendChat user={user} message={lastMessage} id={id} />
						</div>
					</motion.div>
				);
			});
			setChatElement(chat);
		}
	}, [chats]);

	/* This code is creating a search functionality for the chat list component. It uses the `useState`
	hook to create a state variable `searchChats` and the `useEffect` hook to update it whenever the
	`input` state variable changes. */

	const fetchUserToChat = async () => {
		try {
			if (chatElement != "") {
				const currentUsers = [...Array(chatElement.length)].map(
					(x, i) => chatElement[i].props.children.props.children.props.user
				);	

				const { data } = await LsitUsersToChat.get("", {
					params: {
						currentUser: userInfo.user,
						searchUser: input,
						currentUsers: currentUsers,
					},
				});

				return data.users;
			} else {
				const { data } = await LsitUsersToChat.get("", {
					params: {
						currentUser: userInfo.user,
						searchUser: input,
						currentUsers: "-",
					},
				});

				return data.users;
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Search existing chats and user to chat with
	const [searchChats, setSearchChats] = useState(<></>);
	const listOfSearchedChatsAndUsers = async () => {

		/* The code is mapping over the `chatElement` array, which contains the chat elements to be displayed
		in the chat list component. For each element in the array, it checks if the user's name (obtained
		from `chatElement[i].props.children.props.children.props.user`) includes the input value (after
		converting both to lowercase). If it does, it creates a new chat element with the user's name,
		last message, and ID, and adds it to the `existingChats` array. If the user's name does not
		include the input value, it returns nothing. Finally, the `existingChats` array is rendered in the
		component. */
		const existingChats = chatElement.map((x, i) => {
			const user = chatElement[i].props.children.props.children.props.user;

			if (!user.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
				return;
			}

			const id = chatElement[i].props.children.props.children.props.id;
			const lastMessage =
				chatElement[i].props.children.props.children.props.message;

			return (
				<motion.div key={i} whileHover={{ scale: 1.01 }}>
					<div className="mb-2 rounded-2xl /hover:border /hover:py-1 /hover:px-1 border-primary-dark">
						<FriendChat user={user} message={lastMessage} id={id} />
					</div>
				</motion.div>
			);
		});

		/* The code is fetching a list of users to chat with using the `fetchUserToChat` function. It then
		maps over the list of users and creates a chat element for each user. The chat element includes
		the user's name, an empty message, and the user's ID. The chat elements are stored in the
		`usersToChat` array. */
		const listOfUsersToChat = await fetchUserToChat()

		const usersToChat = listOfUsersToChat.map((x, i) => {
			const user = listOfUsersToChat[i].user;
			const id = listOfUsersToChat[i].id;
			const photoURL = listOfUsersToChat[i].photoURL;

			return (
				<motion.div key={i} whileHover={{ scale: 1.01 }}>
					<div className="mb-2 rounded-2xl /hover:border /hover:py-1 /hover:px-1 border-primary-dark">
						<FriendChat user={user} message="" id={id} />
					</div>
				</motion.div>
			);
		});

		setSearchChats(
			<>
				<div>
					<div>{existingChats}</div>
					<h3
						className="w-full 
						font-semibold
						flex place-content-center my-5"
					>
						Users
					</h3>
					<div>{usersToChat}</div>
				</div>
			</>
		);
	};

	useEffect(() => {
		if (input != "") {
			const delay = setTimeout(() => {
				listOfSearchedChatsAndUsers();
			}, 300);
			return () => clearTimeout(delay);
		} else {
			setSearchChats(<></>);
		}
	}, [input]);

	useEffect(() => {
		setInput("");
	}, [chats]);

	const handdleInputChange = (e) => {
		if (!e.includes(" ")) {
			setInput(e);
		}
	};

	//Desktop
	const desktop = () => {
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
					<div
						id="chats"
						className="h-full mx-2 overflow-auto overflow-x-hidden"
					>
						{input == "" ? <>{chatElement}</> : <>{searchChats}</>}
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
							value={input}
							onChange={(e) => handdleInputChange(e.target.value)}
							type="text"
							placeholder="Search chat"
							className="text-base bg-transparent  w-full outline-none"
						/>
					</div>
				</div>
			</>
		);
	};

	//Mobile
	const mobile = () => {
		return (
			<>
				<div
					id="container"
					className={`
					bg-secondary-light
					${isMyInputFocused ? "h-screen" : "h-full"}
					verflow-auto
					w-screen
					flex flex-col
					font-inter text-primary-dark`}
				>
					<h1
						id="title"
						className="place-self-center 
						font-semibold text-base
						my-6"
					>
						Chats
					</h1>
					<div
						id="chats"
						className="h-full mx-6 overflow-auto overflow-x-hidden"
					>
						{input == "" ? <>{chatElement}</> : <>{searchChats}</>}
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
							onFocus={() => setIsMyInputFocused(true)}
							onBlur={() => setIsMyInputFocused(false)}
							value={input}
							onChange={(e) => handdleInputChange(e.target.value)}
							type="text"
							placeholder="Search chat"
							className="text-base bg-transparent  w-full outline-none"
						/>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="block sm:hidden h-full">{mobile()}</div>
			<div className="hidden sm:block">{desktop()}</div>
		</>
	);
}