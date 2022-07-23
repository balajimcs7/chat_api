const userController = require('./users.controllers');
const userService = require('./users.services');
const express = require('express');
const routes = express.Router();

routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.get("/user-profile", userController.userProfile);


module.exports = routes;