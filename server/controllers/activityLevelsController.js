let activityLevels = [];
let id = 0;

module.exports = {
    create: (req, res) => {
        const { name, description, multiplier } = req.body;
        activityLevels.push({ id, name, description, multiplier });
        id++;
        res.status(200).send(activityLevels);
    },
    read: (req, res) => {
        res.status(200).send(activityLevels);
    },
    update: (req, res) => {
        const { name, description, multiplier } = req.body;
        const levelID = req.params.id;
        const indexOfLevel = activityLevels.findIndex (level => level.id == levelID);
        activityLevels[indexOfLevel] = {
            id: levelID,
            name: name ? name : activityLevels[indexOfLevel].name,
            description: description ? description : activityLevels[indexOfLevel].description,
            multiplier: multiplier ? multiplier : activityLevels[indexOfLevel].multiplier
        }
        res.status(200).send(activityLevels);
    },
    destroy: (req, res) => {
        const levelID = req.params.id;
        const indexOfLevel = activityLevels.find(level => level.id == levelID);
        activityLevels.splice(indexOfLevel,1);
        res.status(200).send(activityLevels);
    }
}