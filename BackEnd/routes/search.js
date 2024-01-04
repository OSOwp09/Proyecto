const express = require("express");
const router = express.Router();
const {
	listUsers,
	listUsersByHashtag,
	findUserByEmail,
	findUserByUser,
	findPublication,
    listPublications,
	listPublicationsByHashtags,
	listSearchCards,
	listChats,
	listUsersToChat
} = require("../Controllers/search");

router.get("/listUsers", listUsers)

router.get("/listUsersByHashtag", listUsersByHashtag)

router.get("/findUserByEmail", findUserByEmail)

router.get("/findUserByUser", findUserByUser)

router.get("/listPublications", listPublications)

router.get("/listPublicationsByHashtags", listPublicationsByHashtags)

router.get("/listSearchCards", listSearchCards)

router.get("/findPublication", findPublication)

router.get("/listChats", listChats)

router.get("/listUsersToChat", listUsersToChat)

module.exports = router;
