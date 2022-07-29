const userController = require('./users.controllers');
const userService = require('./users.services');
const express = require('express');
const routes = express.Router();



routes.post("/userRegister", userController.userRegister);
routes.post("/ownerRegister", userController.ownerRegister);
routes.post("/shopAdminRegister", userController.shopAdminRegister);
routes.post("/userLogin", userController.userLogin);
routes.post("/ownerLogin", userController.ownerLogin);
routes.post("/shopAdminLogin", userController.shopAdminLogin);
routes.post("/adminLogin", userController.adminLogin);
routes.get("/user-profile", userController.userProfile);




module.exports = routes;