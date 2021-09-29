import mongoose from 'mongoose'; //mongose ekle
const Schema = mongoose.Schema;
const directorSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    bio:String,
    createAt:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model('directors',directorSchema)
