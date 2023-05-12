const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const { createPublication, listPublications, updatePublication, deletePublication } = require("../Controllers/publication");

router.use(validarJWT);

router.get("/list", listPublications);

router.post("/new", createPublication);

router.post("/update", updatePublication)

router.post("/delete", deletePublication)


module.exports = router;
