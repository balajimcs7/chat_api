const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    houseNo: {
        type: String,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    landMark: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userType: {
        type: String,
        enum : ['user','admin','shopAdmin','owner'],
        default: 'user'
    },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "Email aldready in use."});

const User = mongoose.model("user", userSchema);

module.exports = User;