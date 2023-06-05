const resourceDbService = require("../../data/services/db/ResourceDbService");

const getAll = async () => {
    const resources = await resourceDbService.getAll();
    return resources;
}

const getById = async (id) => {
    const resource = await resourceDbService.getById(id);
    return resource;
}

const getByUrlUserId = async (url, userId) => {
    const resource = await resourceDbService.getByUrlUserId(url, userId);
    return resource;
}

const create = async (resource) => {
    const newResource = await resourceDbService.create(resource);
    return newResource;
}

const update = async (resource) => {
    const updatedResource = await resourceDbService.update(resource);
    return updatedResource;
}

const upsert = async (resource) => {
    const upsertResource = await resourceDbService.upsert(resource);
    return upsertResource;
}

const remove = async (id) => {
    await resourceDbService.remove(id);
}

module.exports = { getAll, getById, getByUrlUserId, create, update, upsert, remove };
