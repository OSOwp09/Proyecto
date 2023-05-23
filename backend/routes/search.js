const express = require("express");
const router = express.Router();
const {
	listUsers,
	listUsersByHashtag,
	findUserByEmail,
	findUserByUser,
	findPublication,
    listPublications,
	listPublicationsByHashtags
} = require("../Controllers/search");

router.get("/listUsers", listUsers)

router.get("/listUsersByHashtag", listUsersByHashtag)

router.get("/findUserByEmail", findUserByEmail)

router.get("/findUserByUser", findUserByUser)

router.get("/listPublications", listPublications)

router.get("/listPublicationsByHashtags", listPublicationsByHashtags)

router.get("/findPublication", findPublication)

module.exports = router;
