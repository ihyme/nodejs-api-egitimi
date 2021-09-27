import mongoose from 'mongoose'
const dbString = "mongodb+srv://<user>:<pass>@<server>:<port>/<dbname>?retryWrites=true&w=majority";
export default ()=>{
    mongoose.connect(dbString)
    mongoose.connection.on('open',()=>{
            console.log("Mongo DB Bağlantısı Açıldı");
        });
    mongoose.connection.on('error',()=>{
            console.log("Mongo DB Bağlantısında Hata Oluştu");
        });
    mongoose.Promise = global.Promise;
}