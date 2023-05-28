const express = require("express");
const _ = require("lodash");
const Usuario = require("../models/Usuario");
const PublicationScheme = require("../models/PublicationSchema");
const commentariesSchema = require("../models/commentariesSchema");
const chatSchema = require("../models/chatSchema");

// -------- users ------------------->

const listUsers = async (req, res = express.request) => {
	try {
		const usuarios = await Usuario.aggregate([
			{
				$lookup: {
					from: "publications",
					localField: "_id",
					foreignField: "userId",
					as: "publicaciones",
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					user: 1,
					email: 1,
					photoURL: 1,
					hashtags: 1,
					publicaciones: {
						$slice: ["$publicaciones", 3],
					},
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					user: 1,
					email: 1,
					photoURL: 1,
					hashtags: 1,
					publicaciones: {
						$map: {
							input: "$publicaciones",
							as: "pub",
							in: {
								photoURL: "$$pub.photoURL",
							},
						},
					},
				},
			},
		]);

		return res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error interno",
		});
	}
};

const listUsersByHashtag = async (req, res = express.request) => {
	const { hashtags } = req.query;
	try {
		const resp = await Usuario.aggregate([
			{
				$lookup: {
					from: "publications",
					localField: "_id",
					foreignField: "userId",
					as: "publicaciones",
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					user: 1,
					email: 1,
					photoURL: 1,
					hashtags: 1,
					publicaciones: {
						$slice: ["$publicaciones", 3],
					},
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					user: 1,
					email: 1,
					photoURL: 1,
					hashtags: 1,
					publicaciones: {
						$map: {
							input: "$publicaciones",
							as: "pub",
							in: {
								photoURL: "$$pub.photoURL",
							},
						},
					},
				},
			},
		]);

		const hashtagsArray = hashtags.split(" ");
		let usuarios = [];

		await hashtagsArray.map((x, i) => {
			if (i == 0) {
				usuarios = resp.filter((p) =>
					p.hashtags.toLowerCase().includes(hashtagsArray[0].toLowerCase())
				);
				return;
			}

			usuarios = _.union(
				resp.filter((p) =>
					p.hashtags.toLowerCase().includes(hashtagsArray[i].toLowerCase())
				),
				usuarios
			);
		});

		return res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error interno",
		});
	}
};

const findUserByEmail = async (req, res = express.request) => {
	const { email } = req.query;

	try {
		const usuario = await Usuario.findOne({ email: email })
			.select("name user email hashtags photoURL")
			.populate("publications");

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: "Email not found",
			});
		}

		return res.json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

const findUserByUser = async (req, res = express.request) => {
	const { user } = req.query;

	try {
		const usuario = await Usuario.findOne({ user: user })
			.select("name user email hashtags photoURL")
			.populate("publications");

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msg: "User not found",
			});
		}

		return res.json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

// <----------------

// -------- publications --------->

const findPublication = async (req, res = express.request) => {
	const { id } = req.query;

	try {
		const publication = await PublicationScheme.findOne({ _id: id }).populate(
			"userId",
			"user photoURL"
		);

		const commentaries = await commentariesSchema
			.find({ publicationId: id })
			.populate("userId", "user photoURL");

		if (!publication) {
			return res.status(404).json({
				ok: false,
				msg: "publication not found",
			});
		}

		return res.json({
			ok: true,
			publication,
			commentaries,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

const listPublications = async (req, res = express.request) => {
	try {
		const publication = await PublicationScheme.find().populate(
			"userId",
			"user photoURL"
		);

		return res.status(200).json({
			ok: true,
			publication,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			publication: "internal Error",
		});
	}
};

const listPublicationsByHashtags = async (req, res = express.request) => {
	const { hashtags, publicationId } = req.query;
	try {
		const publicationsJson = await PublicationScheme.find().populate(
			"userId",
			"user photoURL"
		);

		const hashtagsArray = hashtags.split(" ");
		let publications = [];

		await hashtagsArray.map((x, i) => {
			if (i == 0) {
				publications = publicationsJson.filter((p) =>
					p.hashtags.toLowerCase().includes(hashtagsArray[0].toLowerCase())
				);
				return;
			}

			publications = _.union(
				publicationsJson.filter((p) =>
					p.hashtags.toLowerCase().includes(hashtagsArray[i].toLowerCase())
				),
				publications
			);
		});

		return res.status(200).json({
			ok: true,
			publications: publications.filter((p) => p._id != publicationId),
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publications: "internal Error",
		});
	}
};

// ------- commentaries ------------>

const findCommentaries = async (req, res = express.request) => {
	const { id } = req.params;

	try {
		const commentaries = await commentariesSchema.find({ publicationId: id });

		return res.status(200).json({
			ok: true,
			commentaries,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			commentaries: "internal Error",
		});
	}
};

// <----------------

// ------ chats ---------->

const listChats = async (req, res = express.request) => {
	const { userId } = req.query;

	try {
		let chats;
		chats = await chatSchema
			.find()
			.populate("userId")
			.select("lastMessage userId");

		//console.log("-------",chats[0].userId[0].id,"-------");

		//chats.filter((p) => p.userId[0]._id == userId || p.userId[1]._id == userId);

		console.log(chats.filter((p) => p.userId[1].id == userId));

		return res.status(200).json({
			ok: true,
			chats: chats.filter(
				(p) => p.userId[0]._id == userId || p.userId[1]._id == userId
			),
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error interno",
		});
	}
};

// <----------------

module.exports = {
	findUserByEmail,
	findUserByUser,
	listUsers,
	listUsersByHashtag,
	findPublication,
	listPublications,
	listPublicationsByHashtags,
	findCommentaries,
	listChats,
};
