const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
	{
		name: {
			type: String,
			require: true,
		},
		user: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		photoURL: {
			type: String,
			require: true,
		},
		hashtags: {
			type: String,
			hashtags: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

UsuarioSchema.virtual("publications", {
	ref: "publication",
	localField: "_id",
	foreignField: "userId",
	justOne: false,
});

UsuarioSchema.virtual("commentaries", {
	ref: "commentary",
	localField: "_id",
	foreignField: "userId",
	justOne: false,
});

module.exports = model("Usuario", UsuarioSchema);
