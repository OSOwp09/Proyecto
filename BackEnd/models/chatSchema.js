const { Schema, model } = require("mongoose");

const ChatSchema = Schema({
	chatName: {
		type: String,
		trim: true,
	},
	messages: {
		type: Array,
		trim: true,
		default: [],
	},
	lastMessage: {
		type: Object,
		trim: true,
	},
	userId: [
		{
			type: Schema.Types.ObjectId,
			ref: "Usuario",
		},
	],
});

module.exports = model("chat", ChatSchema);
