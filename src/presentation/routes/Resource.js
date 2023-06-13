const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/ResourceController");
const auth = require("../middleware/AuthMiddleware");

router.post('/url', auth, resourceController.upsert)

module.exports = router;