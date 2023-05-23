const express = require("express");
const CommentariesSchema = require("../models/commentariesSchema");

const createCommentary = async (req, res = express.request) => {
	const commentary = new CommentariesSchema(req.body);

	try {
		//commentary.publicationId = req.uid;
		await commentary.save();
		return res.json({
			ok: true,
			commentary,
		});
		
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			commentary: "internal Error",
		});
	}
};

module.exports = {
	createCommentary
};
