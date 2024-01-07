const express = require("express");
const Usuario = require("../models/Usuario");
const PublicationScheme = require("../models/PublicationSchema");
const CommentariesSchema = require("../models/commentariesSchema");
const ChatSchema = require("../models/chatSchema");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

async function deleteFile(publicationArray) {
	for (let index = 0; index < publicationArray.length; index++) {
		try {
			await admin
				.storage()
				.bucket()
				.file("publications/" + publicationArray[index].firebaseId)
				.delete();
		} catch (error) {
			console.log(error.message);
		}
	}
}

const deleteUserStuff = async (usersToResetList) => {
	for (let index = 0; index < usersToResetList.length; index++) {
		const user = usersToResetList[index];
		const date = new Date().toJSON();

		const publicationArray = await PublicationScheme.aggregate([
			{
				$match: {
					userId: new mongoose.Types.ObjectId(user.id), // Convertir el userId a ObjectId si es una cadena
				},
			},
			{
				$project: {
					_id: 0,
					firebaseId: 1,
				},
			},
		]);

		await deleteFile(publicationArray);

		await PublicationScheme.deleteMany({ userId: user.id });

		await ChatSchema.deleteMany({ userId: user.id });

		await CommentariesSchema.deleteMany({ userId: user.id });

		await Usuario.findOneAndUpdate(
			{ _id: user.id },
			{ $set: { hashtags: "", date: date } },
			{ new: true }
		);
	}
};

const updateDataBase = async (req, res = express.request) => {
	try {
		const dateToStartResetingUsers = "2024-01-01T00:00:00.000Z";
		const hoursUntilResetAUser = 1;
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
							{
								$gte: [
									{ $toDate: "$date" },
									{ $toDate: dateToStartResetingUsers },
								],
							},
							{
								$gte: [
									{ $subtract: [new Date(), { $toDate: "$date" }] },
									hoursUntilResetAUser * 60 * 60 * 1000,
								],
							},
						],
					},
				},
			},
		];

		const usersToResetList = await Usuario.aggregate(pipeline);

		deleteUserStuff(usersToResetList);

		return res.status(200).json({
			ok: true,
			msg:usersToResetList
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: error.message,
		});
	}
};

module.exports = {
	updateDataBase,
};
