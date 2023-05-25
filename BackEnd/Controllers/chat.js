const express = require("express");
const ChatSchema = require("../models/chatSchema");

const createChat = async (req, res = express.request) => {
	const chat = new ChatSchema(req.body);

	try {
		await chat.save();
		return res.json({
			ok: true,
			chat,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			chat: "internal Error",
		});
	}
};

const accesChat = async (req, res = express.request) => {
    
}

module.exports = {
	createChat,
};


