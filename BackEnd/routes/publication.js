const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const {
	createPublication,
	updatePublication,
	deletePublication,
} = require("../Controllers/publication");

router.post("/new", validarJWT, createPublication);

router.post("/update", validarJWT, updatePublication);

router.post("/delete", validarJWT, deletePublication);

module.exports = router;
