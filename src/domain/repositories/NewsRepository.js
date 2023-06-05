const newsDbService = require("../../data/services/db/NewsDbService");
const feedRssApiService = require("../../data/services/api/feed_rss/FeedRssApiService");
const openaiApiService = require("../../data/services/api/openai/OpenaiApiService");
const newsMappers = require("../mappers/NewsMappers");
const mathHelpers = require("../helpers/MathHelpers");

const getAll = async () => {
    const newss = await newsDbService.getAll();
    return newss;
}

const getById = async (id) => {
    const news = await newsDbService.getById(id);
    return news;
}

const getUserNewses = async (userId) => {
    const newses = await newsDbService.getUserNewses(userId);
    return newses;
}

const getNewsesFromUrl = async (url) => {
    var feedUrls = await feedRssApiService.findRss(url);
    if (feedUrls.lenght == 0){
        throw Exception("Url privo di feed");
    }
    var feed = await feedRssApiService.getFeedsRss(feedUrls[0].url);
    var newses = [];
    feed.items.forEach(async (item) => {
        var newsDb = await newsDbService.getByGuid(item.guid);
        if (newsDb == null){
            var news = newsMappers.itemFeedToNews(item);
            newses.push(news);
        } else {
            newses.push(newsDb);
        }
    });
    return newses;
}

const setRankingNewses = async (newses, topicParam) => {
    var vectTopic = await openaiApiService.createEmbedding(topicParam.name + " " + topicParam.description);
    await Promise.all(newses.map(async (news) => {
        if ((news.topics.filter(t => t.topic == topicParam.id).length == 0)) {
            var vectNews = await openaiApiService.createEmbedding(news.title + " " + news.content);
            var rankingVects = mathHelpers.vectorSimilarity(vectTopic, vectNews);
            var topicElement = { topic: topicParam.id, ranking: rankingVects };
            news.topics.push(topicElement);
        }
    }));
    return newses;
}

const create = async (news) => {
    const newNews = await newsDbService.create(news);
    return newNews;
}

const update = async (news) => {
    const updatedNews = await newsDbService.update(news);
    return updatedNews;
}

const upsert = async (news) => {
    const upsertedNews = await newsDbService.upsert(news);
    return upsertedNews;
}

const remove = async (id) => {
    await newsDbService.remove(id);
}

module.exports = { getAll, getById, getUserNewses, getNewsesFromUrl, setRankingNewses, create, update, upsert, remove };
