const newsWorker = require("../../domain/workers/NewsWorker")
const newsRepository = require("../../domain/repositories/NewsRepository");
const resourceRepository = require("../../domain/repositories/ResourceRepository");
const userRepository = require("../../domain/repositories/UserRepository");

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

        if (newsEntity.topic.active == false) 
            throw new Exception("Il topic non è valido");

        var resource = await resourceRepository.getById(newsEntity.resource_id);
        var newses = await newsRepository.getNewsesFromUrl(resource.url);
        newses = await newsRepository.setRankingNewses(newses, newsEntity.topic);

        if (!resource.topics.includes(newsEntity.topic.id)) {
            resource.topics.push(newsEntity.topic.id);
        }

        var resourceUpserted = await resourceRepository.update(resource);

        await Promise.all(newses.map(async (news) => {
            news.resource = resourceUpserted.id;
            newsUpserted = await newsRepository.upsert(news);
            if (!resourceUpserted.newses.includes(newsUpserted.id)) {
                resourceUpserted.newses.push(newsUpserted.id);
            }
        }));

        await resourceRepository.update(resourceUpserted);

        return res.status(200).json({"message": "OK"});
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { getUserNewses, upsert };