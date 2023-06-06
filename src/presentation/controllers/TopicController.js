const topicRepository = require("../../domain/repositories/TopicRepository");

const getAll = async (req, res) => {
    try {
        const topics = await topicRepository.getAll();
        return res.status(200).json(topics);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const getById = async (req, res) => {
    try {
        const topic = await topicRepository.getById(req.params.id);
        return res.status(200).json(topic);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const create = async (req, res) => {
    try {
        const topic = await topicRepository.create(req.body);
        return res.status(200).json(topic);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const update = async (req, res) => {
    try {
        const topic = await topicRepository.update(req.body);
        return res.status(200).json(topic);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

const remove = async (req, res) => {
    try {
        await topicRepository.remove(req.params.id);
        return res.status(200).json({"message": "OK"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { getAll, getById, create, update, remove };