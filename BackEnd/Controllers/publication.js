const express = require("express");
const PublicationScheme = require("../models/PublicationSchema");
const Usuario = require("../models/Usuario");
const _ = require("lodash");
const {uploadFile} = require("../firebase/config");

const createPublication = async (req, res = express.request) => {
	const publication = new PublicationScheme(req.body);

	//const { photoFile, title, description, hashtags, userId } = req.body;

	try {
		await publication.save();
		const UserHashtagsAndUser = await Usuario.findOne({
			_id: publication.userId,
		}).select("hashtags user");
		const filter = { _id: publication.userId };
		const pubHashtags = publication.hashtags.split(" ");
		const userHashtagsAndUser = UserHashtagsAndUser.hashtags.split(" ");
		const update = {
			hashtags: `${_.union(pubHashtags, userHashtagsAndUser).join(" ")}`,
		};
		await Usuario.findOneAndUpdate(filter, update);
		console.log(update);
		return res.json({
			ok: true,
			publication,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publication: "internal Error",
		});
	}
};

const updatePublication = async (req, res = express.request) => {
	const { _id, title, description, hashtags } = req.body;
	console.log(_id, title);

	try {
		const updatedPublication = await PublicationScheme.findByIdAndUpdate(
			_id,
			{ title: title, description: description, hashtags: hashtags },
			{ new: true }
		);

		if (!updatedPublication) {
			return res.status(404).json({
				ok: false,
				message: "publication not found",
			});
		}

		return res.status(200).json({
			ok: true,
			publication: updatedPublication,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publication: "Internal Error",
		});
	}
};

const deletePublication = async (req, res = express.request) => {
	const { _id } = req.body;

	try {
		const deletedPublication = await PublicationScheme.findByIdAndDelete(_id);
		if (!deletedPublication) {
			return res.status(404).json({
				ok: false,
				message: "publication not found",
			});
		}
		return res.status(200).json({
			ok: true,
			publication: deletedPublication,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publication: "Internal Error",
		});
	}
};
//---------------

module.exports = {
	createPublication,
	updatePublication,
	deletePublication,
};
