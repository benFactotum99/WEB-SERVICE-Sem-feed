const newsRepository = require("../repositories/NewsRepository");
const resourceRepository = require("../repositories/ResourceRepository");
const userRepository = require("../repositories/UserRepository");

const upsertWorker = async (newsEntity) => {
    var resource = await resourceRepository.getByUrl(newsEntity.url);
    var newses = await newsRepository.getNewsesFromUrl(newsEntity.url);
    newses = await newsRepository.setRankingNewses(newses, newsEntity.topic);

    resource.user = newsEntity.user_id;
    resource.url = newsEntity.url;
    if (resource.topics.filter(n => n == newsEntity.topic.id).length == 0) {
        resource.topics.push(newsEntity.topic.id);
    }
    var resourceUpserted = await resourceRepository.upsert(resource);
    await Promise.all(newses.map(async (news) => {
        news.resource = resourceUpserted.id;
        news.user = newsEntity.user_id;
        news.resourceUrl = newsEntity.url;
        newsUpserted = await newsRepository.upsert(news);
        if (resource.newses.filter(n => n == newsUpserted.id).length == 0) {
            resourceUpserted.newses.push(newsUpserted.id);
        }
    }));

    await resourceRepository.update(resourceUpserted);

    const user = await userRepository.getById(newsEntity.user_id);
    if (user.resources.filter(n => n == resourceUpserted.id).length == 0) {
        user.resources.push(resourceUpserted.id);
    }
    await userRepository.update(user);
}

const daemonWorker = async () => {

    var users = await userRepository.getUserResource();
    users.map(async user => {
        user.resources.map(async resource => {
            resource.topics.map(async topic => {
                await upsertWorker({
                    "url": resource.url,
                    "user_id": user.id,
                    "topic": topic
                });
            });
        });
    });
}

module.exports = { upsertWorker, daemonWorker };