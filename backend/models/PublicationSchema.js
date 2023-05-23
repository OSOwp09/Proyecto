const { Schema, model } = require("mongoose");

const PublicationScheme = Schema(
	{
		photoURL: {
			type: String,
			required: true,
		},
		firebaseId:{
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
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
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

PublicationScheme.virtual("commentaries", {
	ref: "commentary",
	localField: "_id",
	foreignField: "publicationId",
	justOne: false,
});

module.exports = model("publication", PublicationScheme);
