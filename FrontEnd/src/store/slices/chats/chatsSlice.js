import { createSlice } from "@reduxjs/toolkit";

export const ChatsSlice = createSlice({
	name: "chats",
	initialState: {
		chatsList: null,
		currentChat: null,
		isChatOpen: false,
	},

	reducers: {
		chatsList: (state, action) => {
			state.chatsList = action.payload.chatsList;
		},
		currentChat: (state, action) => {
			state.currentChat = action.payload.currentChat;
		},
		isChatOpen: (state, action) => {
			state.isChatOpen = action.payload.isChatOpen;
		},
	},
});

export const { chatsList, currentChat, isChatOpen } = ChatsSlice.actions;
