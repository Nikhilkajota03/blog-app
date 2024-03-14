const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
      title:{
        type:String,
        unique:true,
        require:true
      },
      desc:{
        type:String,
        unique:true,
        require:true
      },
      photo:{
        type:String,
        require:false
      },
      username:{
        type:String,
        require:true
      },
      userId:{
        type:String,
        require:true
      },
      categories:{
        type:Array,
      }
},{timestamps:true})


module.exports = mongoose.model("Post", PostSchema)