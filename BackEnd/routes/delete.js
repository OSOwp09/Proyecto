const express = require("express");
const router = express.Router();

const {deleteUser, updateDataBase} = require("../Controllers/delete")

router.post("/deleteUser", deleteUser)

router.get("/", updateDataBase)

module.exports = router;
