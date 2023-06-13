const resourceRepository = require("../../domain/services/ResourceService");
const userService = require("../../domain/services/UserService");

const upsert = async (req, res) => {
    try {
        var newResource = await resourceRepository.upsert({
            url: req.body.url
        });
        var user = await userService.getById(req.body.user_id);
        if (!user.resources.includes(newResource.id))
            user.resources.push(newResource.id);
        await userService.update(user);
        return res.status(200).json(newResource);
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}

module.exports = { upsert };