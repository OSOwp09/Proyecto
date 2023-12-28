import { json } from "react-router-dom";
import { chatsList, currentChat, isChatOpen } from "./chatsSlice";

export const UpdateChatList = (json) => {
	return async (dispatch) => {
		try {
			dispatch(
				chatsList({
					chatsList: json,
				})
			);
		} catch (error) {
			console.log(error.message);
		}
	};
};

export const UpdateCurrentChat = (user) => {
	return async (dispatch) => {
		try {
			dispatch(
				currentChat({
					currentChat: user,
				})
			);
		} catch (error) {
            console.log(error.message);
        }
	};
};

export const OpenChat = () =>{
    return async (dispatch) => {
        try {
            dispatch(
                isChatOpen({
                    isChatOpen: true
                })
            )
        } catch (error) {
            console.log(error.message);
        }
    } 
}

export const CloseChat = () =>{
    return async (dispatch) => {
        try {
            dispatch(
                isChatOpen({
                    isChatOpen: false
                })
            )
        } catch (error) {
            console.log(error.message);
        }
    }
}