const newsWorker = require("../../domain/workers/NewsWorker")
const newsRepository = require("../../domain/repositories/NewsRepository")

const getUserNewses = async (req, res) => {
    try {
        var newses = await newsRepository.getUserNewses(req.params.userId);
        return res.status(200).json(newses);
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

const upsert = async (req, res) => {
    try {
        var newsEntity = req.body;
        await newsWorker.upsertWorker(newsEntity);
        return res.status(200).json({"message": "OK"});
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { getUserNewses, upsert };