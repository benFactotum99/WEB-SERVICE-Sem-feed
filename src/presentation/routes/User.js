const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const auth = require("../middleware/AuthMiddleware");

//router.get('/', auth, userController.getAll)
router.get('/:id', auth, userController.getById)
//router.post('/', auth, userController.create)
//router.put('/', auth, userController.update)
//router.delete('/:id', auth, userController.remove)

module.exports = router;