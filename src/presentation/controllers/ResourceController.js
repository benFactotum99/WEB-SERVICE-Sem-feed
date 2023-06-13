const resourceRepository = require("../../domain/repositories/ResourceRepository");
const userRepository = require("../../domain/repositories/UserRepository");
const Resource = require("../../data/models/Resource"); 

const upsert = async (req, res) => {
    try {
        var newResource = await resourceRepository.upsert({
            url: req.body.url
        });
        var user = await userRepository.getById(req.body.user_id);
        if (!user.resources.includes(newResource.id))
            user.resources.push(newResource.id);
        await userRepository.update(user);
        return res.status(200).json(newResource);
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { upsert };