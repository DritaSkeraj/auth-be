const {Schema,model} = require("mongoose")

const bcrypt = require("bcrypt")

const schema = new Schema({
    googleId:String,
    first:{
        givenName:String,
        familyName:String
    },
    displayName:String,
    email:{type:String,unique:true},
    password:String,
    photos:Array
},{timestamps:true})

module.exports = model("User", schema)