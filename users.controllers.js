const bcryptjs = require('bcryptjs');
const userService = require('./users.services');
const User = require('./user.model');
const Product = require('./product_model');
const Category =require('./categories_model')

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

 exports.vegtableList = (req, res, next) => {
    // console.log("ee");
    const{ Category, product_name, product_price, product_description, product_isLikeMe, product_image, secondary_image} = req.body;
    userService.vegtableList({Category, product_name, product_price, product_description, product_isLikeMe,  secondary_image, product_image}, (error, result) => {
     if(error){
         return next(error);
         
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };
 
 exports.fruitsList = (req, res, next) => {
    // console.log("ee");
    const{ Category, product_name, product_price, product_description, product_isLikeMe,  product_image, secondary_image} = req.body;
    userService.fruitsList({Category, product_name, product_price, product_description, product_isLikeMe,  secondary_image, product_image}, (error, result) => {
     if(error){
         return next(error);
         
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };

 exports.houseHoldList = (req, res, next) => {
    // console.log("ee");
    const{ Category, product_name, product_price, product_description, product_isLikeMe,  product_image, secondary_image} = req.body;
    userService.houseHoldList({Category, product_name, product_price, product_description, secondary_image, product_isLikeMe,  product_image}, (error, result) => {
     if(error){
         return next(error);
         
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };

 exports.snaksList = (req, res, next) => {
    // console.log("ee");
    const{ Category, product_name, product_price, product_description, product_isLikeMe,  product_image,secondary_image} = req.body;
    userService.snaksList({Category, product_name, product_price, product_description, secondary_image, product_isLikeMe,  product_image}, (error, result) => {
     if(error){
         return next(error);
         
     }
     return res.status(200).send({
         message: "Success",
         data: result,
     });
    });
 };


 exports.vegetableGet = async (req, res, next) => {
    console.log("all");
   try{
    const product = await Product.find()
    console.log(product)
    res.json(product)
   }catch(error){
console.log("error")
res.json(error)
   }
 };

 exports.getone = async (req, res, next) => {
    console.log(req.query.Category);
   try{
    let category = req.query.Category
    const product = await Category.findOne({name : {$eq:category}});
    const productid=product.id
    const product1 = await Product.find({Category : {$eq:productid}});
    
    console.log(product1)
    // res.json(product)
    return res.status(200).send({
        message: "Success",
        data: product1,
    });
   }catch(error){
console.log("error")
res.json(error)
   }
 };

 
 
 

exports.userProfile = (req, res, next) =>{
  return res.status(200).json({message: "Authorized User"});
  
};