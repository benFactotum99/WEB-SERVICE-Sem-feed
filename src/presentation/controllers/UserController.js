const userService = require("../../domain/services/UserService");

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const create = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const update = async (req, res) => {
    try {
        const user = await userService.update(req.body);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const remove = async (req, res) => {
    try {
        await userService.remove(req.params.id);
        return res.status(200).json({"message": "OK"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { getAll, getById, create, update, remove };
