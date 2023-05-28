const express = require("express");
const Usuario = require("../models/Usuario");
const PublicationScheme = require("../models/PublicationSchema");
const CommentariesSchema = require("../models/commentariesSchema");
const ChatSchema = require("../models/chatSchema")

const deleteUser = async (req, res = express.request) => {
	const { id } = req.body;
	try {
		

		await CommentariesSchema.deleteMany({ userId: id });
		await PublicationScheme.deleteMany({ userId: id });
		await Usuario.deleteMany({ _id: id });

		return res.status(200).json({
			ok: true,
		});
		
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: "internal Error",
		});
	}
};

module.exports = {
	deleteUser,
};
