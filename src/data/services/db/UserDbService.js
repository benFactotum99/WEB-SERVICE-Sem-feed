const User = require("../../models/User");

const getAll = async () => {
    const users = await User.find();
    return users;
}

const getById = async (id) => {
    const user = await User.findById(id);
    return user;
}

const getUserResource = async () => {
    const users = await User.find().populate({ 
        path: 'resources',
        populate: {
          path: 'topics',
          model: 'Topic'
        } 
    });
    return users;
}

const create = async (user) => {
    const newUser = await User.create(user);
    return newUser;
}

const update = async (user) => {
    const editUser = await User.findOneAndUpdate(
        { _id: user.id },
        user,
        { returnOriginal: false }
    );
    return editUser;
}
  
const remove = async (id) => {
    await User.deleteOne(
        { _id: id }
    );
}

module.exports = { getAll, getById, getUserResource, create, update, remove };