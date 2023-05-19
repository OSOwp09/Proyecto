const { Schema, model } = require("mongoose");

const CommentariesSchema = Schema({

	text: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	publicationId: {
		type: Schema.Types.ObjectId,
		ref: "publication",
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
});

module.exports = model("commentary", CommentariesSchema);
