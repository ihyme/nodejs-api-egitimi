import mongoose from "mongoose";
const Schema = mongoose.Schema;
const User = new Schema({
   uname:{
       required:true,
       type:String,
       unique:true
   },
   pass:{
       type:String,
       minlength:5
   }
   
});


export default mongoose.model("users",User)
