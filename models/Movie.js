import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    title:{
        type:String,
        required:[true,"Film başlığını girmek zorundasınız."],
    },
    category:String,
    country:String,
    year:Number,
    imdb_score : Number,
    director_id:Schema.Types.ObjectId,
    date : {
        type:Date,
        default: Date.now
    }
});

export default mongoose.model('movies',MovieSchema);