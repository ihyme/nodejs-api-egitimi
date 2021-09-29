import { Router } from "express";
import mongoose from "mongoose";
const router = Router();
import Director from '../models/Director.js'


//get list directors
router.get('/',(req,res)=>{
 Director.aggregate([
        {
            $lookup : {
                from : "movies", //nerden alacağız
                localField :  '_id', //tablomda(director) hangi field
                foreignField : "director_id", //from tablosundaki karşılığı 
                as : 'movies' // dönen data buraya aktarılacak
            }
        },{
            $unwind : {
                    path: "$movies", // unwind datayı dışarı çıkarmak için kullanılıyor
                    preserveNullAndEmptyArrays:true //hiç moviesi olmayanlarıda alıyor
                }
            

        },
        {
            $group : {
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies"
                }
            }
        },{
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                bio:"$_id.bio",
                movies:"$movies"
            }
        }
    ],(err,data)=>{
        if(err)
           res.json(err)
        else
           res.json(data)
    });
    
})


//get detail director
router.get('/:director_id',(req,res)=>{
    Director.aggregate([
        {
            $match : {
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup : {
                from : "movies", //nerden alacağız
                localField :  '_id', //tablomda(director) hangi field
                foreignField : "director_id", //from tablosundaki karşılığı 
                as : 'movies' // dönen data buraya aktarılacak
            }
        },{
            $unwind : {
                    path: "$movies", // unwind datayı dışarı çıkarmak için kullanılıyor
                    preserveNullAndEmptyArrays:true //hiç moviesi olmayanlarıda alıyor
                }
            

        },
        {
            $group : {
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies"
                }
            }
        },{
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"$_id.surname",
                bio:"$_id.bio",
                movies:"$movies"
            }
        }
    ],(err,data)=>{
        if(err)
           res.json(err)
        else
           res.json(data)
    });
})
//add director
router.post('/',(req,res)=>{
    const reg = new Director(req.body);
    if(reg.save()){
            res.json({success:true,message:"Kayıt Başarılı"})
        } else {
            res.json({success:false,message:"Kayıt Başarısız"})
    }
});

//update director
router.put('/:director_id',(req,res)=>{
    Director.findByIdAndUpdate(req.params.director_id,req.body,(err,data)=>{
        if(!err){
            res.json({success:true,message:"Kayıt Güncelleme Başarılı"})
        } else {
            res.json({success:false,message:"Kayıt Güncelleme Başarısız"})
    }
    });
});

//delete director
router.delete('/:director_id',(req,res)=>{
    Director.findByIdAndRemove(req.params.director_id,(err,data)=>{
        if(!err){
            if(data)
            {
                res.json({success:true,message:"Kayıt Silme Başarılı"})
            }
                else {
                res.json({success:false,message:"Kayıt Bulunamadı"})
            }
        } else {
            res.json({success:false,message:"Kayıt Silme Başarısız"})
    }
    });
});

export default router;