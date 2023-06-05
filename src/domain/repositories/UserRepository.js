const userDbService = require("../../data/services/db/UserDbService");

const getAll = async () => {
    const users = await userDbService.getAll();
    return users;
}

const getById = async (id) => {
    const user = await userDbService.getById(id);
    return user;
}

const getUserResource = async () => {
    const users = await userDbService.getUserResource();
    return users;
}

const create = async (user) => {
    const newUser = await userDbService.create(user);
    return newUser;
}

const update = async (user) => {
    const updatedUser = await userDbService.update(user);
    return updatedUser;
}

const remove = async (id) => {
    await userDbService.remove(id);
}

module.exports = { getAll, getById, getUserResource, create, update, remove };
