const bcryptjs = require('bcryptjs');
const userService = require('./users.services');

exports.userRegister = (req, res, next) => {
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.userRegister(req.body, (error, result) => {
         if(error){
            return next(error);
         }
         return res.status(200).send({
            message: "Success",
            data: result,
         });
    });
};

exports.ownerRegister = (req, res, next) => {
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.ownerRegister(req.body, (error, result) => {
         if(error){
            return next(error);
         }
         return res.status(200).send({
            message: "Success",
            data: result,
         });
    });
};

exports.shopAdminRegister = (req, res, next) => {
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.shopAdminRegister(req.body, (error, result) => {
         if(error){
            return next(error);
         }
         return res.status(200).send({
            message: "Success",
            data: result,
         });
    });
};


exports.userLogin = (req, res, next) => {
   const{ email, password} = req.body;
   userService.userLogin({email, password}, (error, result) => {
    if(error){
        return next(error);
    }
    return res.status(200).send({
        message: "Success",
        data: result,
    });
   });
};

exports.adminLogin = (req, res, next) => {
    const{ email, password} = req.body;
    userService.adminLogin({email, password}, (error, result) => {
     if(error){
         return next(error);
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };

 exports.shopAdminLogin = (req, res, next) => {
    const{ email, password} = req.body;
    userService.shopAdminLogin({email, password}, (error, result) => {
     if(error){
         return next(error);
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };

 exports.ownerLogin = (req, res, next) => {
    const{ email, password} = req.body;
    userService.ownerLogin({email, password}, (error, result) => {
     if(error){
         return next(error);
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };

exports.userProfile = (req, res, next) =>{
  return res.status(200).json({message: "Authorized User"});
  
};