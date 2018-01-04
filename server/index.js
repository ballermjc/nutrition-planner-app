//declare variables, require statements

                    const express = require('express'),
                              app = express(),
                       bodyParser = require('body-parser'),
         activityLevelsController = require( __dirname + `/controllers/activityLevelsController`),
         nutritionPlansController = require( __dirname + `/controllers/nutritionPlansController`),
            activityLevelsBaseURL = `/api/activityLevels`,
            nutritionPlansBaseURL = `/api/nutritionPlans`,
                             PORT = process.env.PORT || 3001;


//use BodyParser
app.use(bodyParser.json());

//activityLevelsAPI
app.get(activityLevelsBaseURL, activityLevelsController.read);
app.post(activityLevelsBaseURL, activityLevelsController.create);
app.put(`${activityLevelsBaseURL}/:id`, activityLevelsController.update);
app.delete(`${activityLevelsBaseURL}/:id`, activityLevelsController.destroy);

//nutritionPlansAPI
app.get(nutritionPlansBaseURL, nutritionPlansController.read);
app.post(nutritionPlansBaseURL, nutritionPlansController.create);
app.put(`${nutritionPlansBaseURL}/:id`, nutritionPlansController.update);
app.delete(`${nutritionPlansBaseURL}/:id`, nutritionPlansController.destroy);

//start the server
app.listen(PORT, console.log(`Here comes the BOOM on port ${PORT}`));