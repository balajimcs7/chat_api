const User = require('./user.model');
const Product = require('./product_model');
const bcrypt = require('bcryptjs');
const auth = require('./auth');


async function userLogin({email, password}, callback){
    const user = await User.findOne({email});

    if(user != null){
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(email);
            return callback(null, {...user.toJSON(), token});
        }
        else{
            return callback({
                message: "Invalid username/password",
            });
        }
    }
        else{
            return callback({
                message: "Invalid username/Password",
            });
        }

    }

    async function adminLogin({email, password}, callback){
        const user = await User.findOne({email});
    
        if(user != null){
            if(bcrypt.compareSync(password, user.password)){
                const token = auth.generateAccessToken(email);
                return callback(null, {...user.toJSON(), token});
            }
            else{
                return callback({
                    message: "Invalid username/password",
                });
            }
        }
            else{
                return callback({
                    message: "Invalid username/Password",
                });
            }
    
        }

        async function shopAdminLogin({email, password}, callback){
            const user = await User.findOne({email});
        
            if(user != null){
                if(bcrypt.compareSync(password, user.password)){
                    const token = auth.generateAccessToken(email);
                    return callback(null, {...user.toJSON(), token});
                }
                else{
                    return callback({
                        message: "Invalid username/password",
                    });
                }
            }
                else{
                    return callback({
                        message: "Invalid username/Password",
                    });
                }
        
            }


            async function ownerLogin({email, password}, callback){
                const user = await User.findOne({email});
            
                if(user != null){
                    if(bcrypt.compareSync(password, user.password)){
                        const token = auth.generateAccessToken(email);
                        return callback(null, {...user.toJSON(), token});
                    }
                    else{
                        return callback({
                            message: "Invalid username/password",
                        });
                    }
                }
                    else{
                        return callback({
                            message: "Invalid username/Password",
                        });
                    }
            
                }

    async function userRegister(params, callback){
        if(params.username === undefined){

            return callback({message: "Username Required"});
        }
         params["userType"]  =  'user';
       
        const user = new User(params);
        user.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function ownerRegister(params, callback){
        if(params.username === undefined){

            return callback({message: "Username Required"});
        }
         params["userType"]  =  'owner';
       
        const user = new User(params);
        user.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function shopAdminRegister(params, callback){
        if(params.username === undefined){

            return callback({message: "Username Required"});
        }
         params["userType"]  =  'shopAdmin';
       
        const user = new User(params);
        user.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function vegtableList(params, callback){
        // console.log("ee");
        // if(params.category_id === undefined){

        //     return callback({message: "Required"});
        // }
        
        params["product_userType"]  =  'vegtables';
        const product = new Product(params);
        product.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function fruitsList(params, callback){
        // console.log("ee");
        // if(params.category_id === undefined){

        //     return callback({message: "Required"});
        // }
        params["product_userType"]  =  'Fruits';
       
        const product = new Product(params);
        product.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function houseHoldList(params, callback){
        // console.log("ee");
        // if(params.category_id === undefined){

        //     return callback({message: "Required"});
        // }
        
        params["product_userType"]  =  'household';
        const product = new Product(params);
        product.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    async function snaksList(params, callback){
        // console.log("ee");
        // if(params.category_id === undefined){

        //     return callback({message: "Required"});
        // }
        params["product_userType"]  =  'snaks';
       
        const product = new Product(params);
        product.save()
        
        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
    }

    // async function vegtableGet(params, callback){
    //     // console.log("ee");
        
        
    //     const product = Product(params);
    //     product.find()
        
    //     .then((response) => {
    //         return callback(null, response);

    //     }).catch((error) => {
    //         return callback(error);
    //     });
    // }


    module.exports = {
        userLogin,
        adminLogin,
        shopAdminLogin,
        ownerLogin,
        userRegister,
        ownerRegister,
        shopAdminRegister,
        vegtableList,
        fruitsList,
        houseHoldList,
        snaksList,
        
    };