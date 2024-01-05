const express = require("express");
const Usuario = require("../models/Usuario");
const PublicationScheme = require("../models/PublicationSchema");
const CommentariesSchema = require("../models/commentariesSchema");
const ChatSchema = require("../models/chatSchema");

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

// const deleteUserStuff = async (req, res = express.request) => {
// 	const { id } = req.body;
// 	try {
// 		await CommentariesSchema.deleteMany({ userId: id });
// 		await PublicationScheme.deleteMany({ userId: id });

// 		return res.status(200).json({
// 			ok: true,
// 		});

// 	} catch (error) {
// 		return res.status(500).json({
// 			ok: false,
// 			msg: "internal Error",
// 		});
// 	}
// };

const deleteUserStuff = async (id) => {
	console.log(id);

	await CommentariesSchema.deleteMany({ userId: id });
	await PublicationScheme.deleteMany({ userId: id });
	await ChatSchema.deleteMany({ userId: id });

	await Usuario.findOneAndUpdate(
		{ _id: id },
		{ $set: { hashtags: "" } },
		{ new: true }
	);
};

const updateDataBase = async (req, res = express.request) => {
	try {
		//deleteUserStuff("659734785801ad1b5bd1912b");
		const fechaLimite = "2024-01-01T00:00:00.000Z";
		const horasDeseadas = 1;
		const pipeline = [
			{
				$project: {
					id: "$_id",
					user: "$user",
					date: "$date",
					test: { $subtract: [new Date(), { $toDate: "$date" }] },
				},
			},
			{
				$match: {
					$expr: {
						$and: [
							{ $gte: [{ $toDate: "$date" }, { $toDate: fechaLimite }] },
							{
								$gte: [
									{ $subtract: [new Date(), { $toDate: "$date" }] },
									horasDeseadas * 60 * 60 * 1000,
								],
							},
						],
					},
				},
			},
		];

		const resultado = await Usuario.aggregate(pipeline);

		console.log(new Date().toJSON());

		return res.status(200).json({
			ok: true,
			msg: resultado,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: error.message,
		});
	}
};

module.exports = {
	deleteUser,
	updateDataBase,
};
