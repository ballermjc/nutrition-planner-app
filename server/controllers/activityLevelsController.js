// let activityLevels = [];
let activityLevels = [
    {
        id: 0,
        name: "Sedentary",
        description: "You have an office job and perform very little light exercise or none at all.",
        multiplier: 1.1
    },
    {
        id: 1,
        name: "Lightly Actice",
        description: "You have an office job and perform very light exercise 1-3 times a week.",
        multiplier: 1.275
    },
    {
        id: 2,
        name: "Moderately Active",
        description: "You have an office job and perform moderate exercise or play sports 3-5 times a week.",
        multiplier: 1.35
    },
    {
        id: 3,
        name: "Very Active",
        description: "You have an office job and perform strenuous exercise or play intense sports 6-7 times a week, or you are employed in a manual labor occupation.",
        multiplier: 1.525
    }
];
let id = 4;

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