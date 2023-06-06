const express = require("express");
const router = express.Router();
const topicController = require("../controllers/TopicController");
const auth = require("../middleware/AuthMiddleware");

router.get('/', auth, topicController.getAll)
router.get('/:id', auth, topicController.getById)
router.post('/', auth, topicController.create)
router.put('/', auth, topicController.update)
router.delete('/:id', auth, topicController.remove)

module.exports = router;