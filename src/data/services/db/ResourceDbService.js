const Resource = require("../../models/Resource");

const getAll = async () => {
    const resources = await Resource.find();
    return resources;
}

const getByUrlUserId = async (url, userId) => {
    const resource = await Resource.findOne({'url': url, 'user': userId});
    if (resource == null) 
        return new Resource();
    else 
        return resource;
}

const getById = async (id) => {
    const resource = await Resource.findById(id);
    return resource;
}

const create = async (resource) => {
    const newResource = await Resource.create(resource);
    return newResource;
}

const upsert = async (resource) => {
    const resUpsert = await Resource.findOneAndUpdate(
        {'url': resource.url, 'user': resource.user}, 
        resource, 
        { upsert: true, returnOriginal: false });
    return resUpsert;
}

const update = async (resource) => {
    const editResource = await Resource.findOneAndUpdate(
        { _id: resource.id },
        resource,
        { returnOriginal: false }
    );
    return editResource;
}
  
const remove = async (id) => {
    await Resource.deleteOne(
        { _id: id }
    );
}

module.exports = { getAll, getById, getByUrlUserId, create, update, upsert, remove };