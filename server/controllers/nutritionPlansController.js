let nutritionPlans = [
    {
        id: 0,
        name: "Zone Diet",
        description: "The Zone diet aims for a nutritional balance of 40 percent carbohydrates, 30 percent fats, and 30 percent protein in each meal. The focus is also on controlling insulin levels, which may result in more successful weight loss and body weight control than other approaches. The Zone diet encourages the consumption of high-quality carbohydrates - unrefined carbohydrates, and fats, such as olive oil, avocado, and nuts.",
        proteinMacro: .30,
        fatMacro: .30,
        carbMacro: .40
    },
    {
        id: 1,
        name: "Ketogenic Diet",
        description: "The ketogenic diet has been used for decades as a treatment for epilepsy and is also being explored for other uses. It involves reducing carbohydrate intake and upping fat intake. It sounds contrary to common sense, but it allows the body to burn fat as a fuel, rather than carbohydrates. Healthy fats, such as those in avocados, coconuts, Brazil nuts, seeds, oily fish, and olive oil are liberally added to the diet to maintain an overall emphasis on fat.",
        proteinMacro: .20,
        fatMacro: .75,
        carbMacro: .05
    },
    {
        id: 2,
        name: "Ectomorph Macros Diet",
        description: "f you're an ectomorph, you're naturally thin with skinny limbs and a high tolerance for carbohydrates. Usually, your metabolic rate is fast. A good starting macronutrient ratio for you would be something like 25% protein, 55% carbs and 20% fat.",
        proteinMacro: 0.25,
        fatMacro: 0.20,
        carbMacro: 0.55
    }
];
let id = 3;

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