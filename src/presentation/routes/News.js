const express = require("express");
const router = express.Router();
const newsController = require("../controllers/NewsController");
const auth = require("../middleware/AuthMiddleware");

router.get('/:userId', auth, newsController.getUserNewses)
router.post('/', auth, newsController.upsert)

module.exports = router;