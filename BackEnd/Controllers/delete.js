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

const deleteUserStuff = async (resultado) => {
	for (let index = 0; index < resultado.length; index++) {
		const user = resultado[index];
		const date = new Date().toJSON();

		await CommentariesSchema.deleteMany({ userId: user.id });
		await PublicationScheme.deleteMany({ userId: user.id });
		await ChatSchema.deleteMany({ userId: user.id });
		await Usuario.findOneAndUpdate(
			{ _id: user.id },
			{ $set: { hashtags: "", date: date } },
			{ new: true }
		);
	}
};

const updateDataBase = async (req, res = express.request) => {
	try {
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

		deleteUserStuff(resultado);

		return res.status(200).json({
			ok: true,
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
