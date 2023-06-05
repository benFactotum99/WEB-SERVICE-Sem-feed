const express = require("express");
const router = express.Router();
const topicController = require("../controllers/NewsController");

router.get('/:userId', topicController.getUserNewses)
router.post('/', topicController.upsert)

module.exports = router;