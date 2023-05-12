const { Schema, model } = require("mongoose");

const PublicationScheme = Schema({
	photoURL: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
    description: {
		type: String,
		required: true,
	},
    hashtags: {
		type: String,
		required: true,
	},
	userPhoto: {
		type: String,
		required: true,
	},
    userName: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
});

module.exports = model("publication", PublicationScheme);
