const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
      username:{
        type:String,
        unique:true,
        require:true
      },
      email:{
        type:String,
        unique:true,
        require:true
      },
      password:{
        type:String,
        require:true
      }
},{timestamps:true})


module.exports = mongoose.model("User", UserSchema)