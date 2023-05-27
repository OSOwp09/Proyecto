const express = require("express");
const ChatSchema = require("../models/chatSchema");
const _ = require("lodash");

const listChats = async (req, res = express.request) => {};

const accesChat = async (req, res = express.request) => {
	const { userId1, userId2 } = req.query;
	const userId = [userId1, userId2];

	if (!userId1 || !userId2) {
		console.log("UserId param not sent with request");
		return res.sendStatus(400);
	}

	try {
		let chat;

		chat = await ChatSchema.findOne({ userId: userId });

		if (chat == "" || chat == null) {
			chat = await ChatSchema.findOne({ userId: userId.reverse() });
		}

		if (chat == "" || chat == null) {
			//------- create a chat ---------------
			chat = new ChatSchema({ userId: userId });
			console.log(chat);
			await chat.save();
			return res.json({
				ok: true,
				chat,
			});
		} else {
			//------ return chat when found -------
			return res.json({
				ok: true,
				chat,
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			chat: "internal Error",
		});
	}
};

const newMessage = async (req, res = express.request) => {
	const { message, userId1, userId2 } = req.body;
	const userId = [userId1, userId2];

	if (!userId1 || !userId2) {
		console.log("UserId param not sent with request");
		return res.sendStatus(400);
	}

	try {
		let chat;

		chat = await ChatSchema.findOne({ userId: userId }).select("messages");

		if (chat == "" || chat == null) {
			chat = await ChatSchema.findOne({ userId: userId.reverse() }).select(
				"messages"
			);
		}

		if (chat.messages != undefined) {
			chat.messages.unshift(message);
			await ChatSchema.findOneAndUpdate(
				{ _id: chat._id },
				{ messages: chat.messages, lastMessage: message }
			);
		} else {
			await ChatSchema.findOneAndUpdate(
				{ _id: chat._id },
				{ messages: message, lastMessage: message }
			);
		}

		return res.json({
			ok: true,
			chat,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			message: "internal Error",
		});
	}
};

module.exports = {
	accesChat,
	newMessage,
};
