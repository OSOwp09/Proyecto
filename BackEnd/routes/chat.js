const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const { createChat } = require("../Controllers/chat");

router.post(
	"/new",
	//validarJWT,
	createChat
);

module.exports = router;
