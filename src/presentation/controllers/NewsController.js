const newsService = require("../../domain/services/NewsService");
const resourceService = require("../../domain/services/ResourceService");

const getUserNews = async (req, res) => {
    try {
        var newsList = await newsService.getUserNews(req.params.userId);
        return res.status(200).json(newsList);
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

const upsert = async (req, res) => {
    try {
        var newsEntity = req.body;

        if (newsEntity.topic.active == false) 
            throw new Exception("Il topic non è valido");

        var resource = await resourceService.getById(newsEntity.resource_id);
        var newsList = await newsService.getNewsFromUrl(resource.url);
        newsList = await newsService.setRankingNews(newsList, newsEntity.topic);

        if (!resource.topics.includes(newsEntity.topic.id)) {
            resource.topics.push(newsEntity.topic.id);
        }

        var resourceUpserted = await resourceService.update(resource);

        await Promise.all(newsList.map(async (news) => {
            news.resource = resourceUpserted.id;
            newsUpserted = await newsService.upsert(news);
            if (!resourceUpserted.news.includes(newsUpserted.id)) {
                resourceUpserted.news.push(newsUpserted.id);
            }
        }));

        await resourceService.update(resourceUpserted);

        return res.status(200).json({"message": "OK"});
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { getUserNews, upsert };