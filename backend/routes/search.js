const express = require("express");
const router = express.Router();
const {
	listUsers,
	findUserByEmail,
	findUserByUser,
	findPublication,
    listPublications
} = require("../Controllers/search");

router.get("/listUsers", listUsers)

router.get("/findUserByEmail", findUserByEmail)

router.get("/findUserByUser", findUserByUser)

router.get("/listPublications", listPublications)

router.get("/findPublication", findPublication)

module.exports = router;
