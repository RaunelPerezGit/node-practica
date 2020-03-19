const express = require('express');
const Router = express.Router();
const controllers = require('./controllers');
const planController = require('./controllers/plan');

Router
    .get('/',controllers.index)
    .post('/chat',controllers.chat)
    .get('/plan',planController.selectPlan)
    .post('/plan',planController.insertPricePlan);


module.exports = Router;