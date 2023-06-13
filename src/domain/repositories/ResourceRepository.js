const resourceDbService = require("../../data/services/db/ResourceDbService");
const feedRssApiService = require("../../data/services/api/feed_rss/FeedRssApiService");

const getAll = async () => {
    const resources = await resourceDbService.getAll();
    return resources;
}

const getById = async (id) => {
    const resource = await resourceDbService.getById(id);
    return resource;
}

const getByUrl = async (url) => {
    const resource = await resourceDbService.getByUrl(url);
    return resource;
}

const create = async (resource) => {
    await findRss(resource.url);
    const newResource = await resourceDbService.create(resource);
    return newResource;
}

const update = async (resource) => {
    const updatedResource = await resourceDbService.update(resource);
    return updatedResource;
}

const upsert = async (resource) => {
    await findRss(resource.url);
    const upsertResource = await resourceDbService.upsert(resource);
    return upsertResource;
}

const findRss = async (url) => {
    var feedUrls = await feedRssApiService.findRss(url);
    if (feedUrls.lenght == 0)
        throw Exception("Url privo di feed");
}

const remove = async (id) => {
    await resourceDbService.remove(id);
}

module.exports = { getAll, getById, getByUrl, create, update, upsert, findRss, remove };
