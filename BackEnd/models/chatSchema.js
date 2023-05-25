const { Schema, model } = require("mongoose");

const ChatSchema = Schema({
	chatName: {
		type: String,
		trim: true,
	},
	messages: {
		type: Array,
		trim: true,
		default: undefined,
	},
	userId: [
		{
			type: Schema.Types.ObjectId,
			ref: "Usuario",
		},
	],
});

module.exports = model("chat", ChatSchema);
