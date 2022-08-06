const userController = require('./users.controllers');
const userService = require('./users.services');
const express = require('express');
const routes = express.Router();
const verifyToken = require('./auth');




routes.post("/userRegister", userController.userRegister);
routes.post("/ownerRegister", userController.ownerRegister);
routes.post("/shopAdminRegister", userController.shopAdminRegister);
routes.post("/userLogin", userController.userLogin);
routes.post("/ownerLogin", userController.ownerLogin);
routes.post("/shopAdminLogin", userController.shopAdminLogin);
routes.post("/adminLogin", userController.adminLogin);
routes.get("/user-profile", userController.userProfile);
routes.post("/vegtables", userController.vegtableList);
routes.post("/Fruits", userController.fruitsList);
routes.post("/household", userController.houseHoldList);
routes.post("/snacks", userController.snaksList);
routes.get("/vegetableGet", verifyToken.authenticateToken, userController.vegetableGet);
routes.get("/getone", verifyToken.authenticateToken, userController.getone);
// routes.get("/productList", async function (req,res ){
//     console.log(req);
// } );



module.exports = routes;