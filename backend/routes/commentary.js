const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const { createCommentary } = require("../Controllers/commentary");
const {findCommentaries} = require("../Controllers/search")

router.post("/new", validarJWT, createCommentary);

router.get("/list", validarJWT, createCommentary);

module.exports = router;
