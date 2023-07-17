const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema= new Schema({
username:String,
email:String,
password:String
});

const usermodel=mongoose.model('users',userSchema);
module.exports=usermodel;