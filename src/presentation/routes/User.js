const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/', userController.create)
router.put('/', userController.update)
router.delete('/:id', userController.remove)

module.exports = router;