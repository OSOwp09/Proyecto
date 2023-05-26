const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const { accesChat, newMessage } = require("../Controllers/chat");

router.get(
	"/",
	//validarJWT,
	accesChat
);

router.post(
	"/newMessage",
	//validarJWT,
	newMessage
);

module.exports = router;
