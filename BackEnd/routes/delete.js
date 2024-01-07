const express = require("express");
const router = express.Router();

const { updateDataBase } = require("../Controllers/delete");

router.get("/", updateDataBase);

module.exports = router;
