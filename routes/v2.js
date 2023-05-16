const express = require("express");

const UserHandle = require("../controller/v2/user");

const router = express.Router();

router.post('/login',UserHandle.login);



module.exports = router;