let nutritionPlans = [];
let id = 0;

module.exports = {
    create: (req, res) => {
        const { name, description, proteinMacro, fatMacro, carbMacro } = req.body;
        nutritionPlans.push( { id, name, description, proteinMacro, fatMacro, carbMacro } );
        id++;
        res.status(200).send(nutritionPlans);
    },
    read: (req, res) => {
        res.status(200).send(nutritionPlans);
    },
    update: (req, res) => {
        const { name, description, proteinMacro, fatMacro, carbMacro } = req.body;
        const planID = req.params.id;
        const indexOfPlan = nutritionPlans.findIndex( plan => plan.id == planID );
        nutritionPlans[indexOfPlan] = {
            id: planID,
            name: name ? name : nutritionPlans[indexOfPlan].name,
            description: description ? description: nutritionPlans[indexOfPlan].description,
            proteinMacro: proteinMacro ? proteinMacro : nutritionPlans[indexOfPlan].proteinMacro,
            fatMacro: fatMacro ? fatMacro : nutritionPlans[indexOfPlan].fatMacro,
            carbMacro: carbMacro ? carbMacro : nutritionPlans[indexOfPlan].carbMacro
        };
        res.status(200).send(nutritionPlans);
    },
    destroy: (req, res) => {
        const planID = req.params.id;
        const indexOfPlan = nutritionPlans.findIndex( plan => plan.id == planID );
        nutritionPlans.splice(indexOfPlan, 1);
        res.status(200).send(nutritionPlans);
    }
}