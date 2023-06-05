const express = require("express");
const router = express.Router();
const topicController = require("../controllers/TopicController");

router.get('/', topicController.getAll)
router.get('/:id', topicController.getById)
router.post('/', topicController.create)
router.put('/', topicController.update)
router.delete('/:id', topicController.remove)

module.exports = router;