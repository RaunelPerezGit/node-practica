const express = require('express');
const Router = express.Router();
const controllers = require('./controllers');
const planController = require('./controllers/plan');
const profileController = require('./controllers/profile');
const userController = require('./controllers/user');

Router
    .get('/',controllers.index)
    .post('/chat',controllers.chat)
    .get('/plan',planController.selectPlan)
    .delete('/plan',planController.deletePlan)
    .post('/plan',planController.insertPricePlan)
    .post('/profile',profileController.insertProfile)
    .delete('/profile',profileController.deleteProfile)
    .get('/profile',profileController.selectProfile)
    .post('/login', userController.login)
    


module.exports = Router;