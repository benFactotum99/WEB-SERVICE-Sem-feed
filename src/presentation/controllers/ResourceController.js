const resourceRepository = require("../../domain/services/ResourceService");
const userService = require("../../domain/services/UserService");
const newsService = require("../../domain/services/NewsService");

const upsert = async (req, res) => {
    try {
        var flag = await newsService.controlResurceFeed(req.body.url);
        if (!flag) {
            return res.status(201).json({"message": "Feed rss non configurato nella risorsa"});
        }

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