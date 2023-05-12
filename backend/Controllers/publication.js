const express = require("express");
const PublicationScheme = require("../models/PublicationScheme");

const createPublication = async (req, res = express.request) => {
	const publication = new PublicationScheme(req.body);

	try {
		publication.userId = req.uid;
		console.log(publication.userName)
		await publication.save();
		return res.json({
			ok: true,
			publication,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publication: "internal Error",
		});
	}
};

const listPublications = async (req, res = express.request) => {
	const publication = await PublicationScheme.find().populate("userId", "name");

	try {
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

// Challenge 18
const updatePublication = async (req, res = express.request) => {

    const {_id, title } = req.body
    console.log(_id, title)

	try {
		const updatedPublication = await PublicationScheme.findByIdAndUpdate(
			_id,
			{title: title},
			{ new: true }
		);

        console.log(updatedPublication)
		if (!updatedPublication) {
			return res.status(404).json({
				ok: false,
				message: "publication not found",
			});
		}

		return res.status(200).json({
			ok: true,
			publication: updatedPublication,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			publication: "Internal Error",
		});
	}
};

const deletePublication = async(req, res = express.request)=>{
    const {_id } = req.body
    
    try {
        const deletedPublication = await PublicationScheme.findByIdAndDelete(_id);
        if (!deletedPublication) {
            return res.status(404).json({
                ok: false,
                message: "publication not found",
            });
        }
        return res.status(200).json({
            ok: true,
            publication: deletedPublication,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            publication: "Internal Error",
        });
    }
}
//---------------

module.exports = {
	createPublication,
	listPublications,
    updatePublication,
    deletePublication
};
