const express = require("express");
const router = express.Router();

const {deleteUser} = require("../Controllers/delete")

router.post("/deleteUser", deleteUser)

module.exports = router;
