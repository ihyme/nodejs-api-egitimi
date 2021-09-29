import { Router } from 'express';
const router = Router();
import Movie from '../models/Movie.js';

/* GET users listing. */
router.get('/', (req, res, next) => {
    Movie.aggregate([
      {
        $lookup : {
          from : "directors",
          localField:"director_id",
          foreignField:"_id",
          as : "director"  //unwind i bununla yapıyorsun.
        }
      },
      {      
        $unwind : {
          path:"$director",
          preserveNullAndEmptyArrays : true
        }
      }
    ],(err,data)=>{
      if(err){
        res.json(err)
      } else {
        res.json(data)
      }
      
    })
});
/* Save new Movie */
router.post('/',(req,res)=>{
  
    const movie = new Movie(req.body);
    movie.save()
        .then((data)=>{
            res.json({'status':1})
          })
        .catch((err)=>{
            res.json(err)
    });
});

router.get('/top5',(req,res)=>{
  Movie.find({},(err,data)=>{
    if(err){
      res.json(err)
    } else {
      res.json(data)
    }
    
  }).limit(5).sort({imdb_score:-1})
})
router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year,end_year} = req.params;
  Movie.find({ 
    year : {
    "$gte":parseInt(start_year), "$lte":parseInt(end_year)
    }
  },(err,data)=>{
    res.json(data) 
  })
})

//Find Movie by ID
router.get('/:movie_id',(req,res,next)=>{


  Movie.findById(req.params.movie_id)
  .then((data)=>{
    if(!data)
    {
      res.json({status:301,message:'Bulunamadı'})
    } else {
      res.json(data)}
    }
     
    
    )
  .catch(err=>res.json(err))

})
router.put('/:movie_id',(req,res,next)=>{
  Movie.findByIdAndUpdate(
        req.params.movie_id, //1. parametre id
        req.body, //2. parametre gelen body değerindekiler
        { 
          new:true 
        } //güncelleme sonrası verileri almak için
        ).then((data)=>{
          if(!data){
            res.json({hata:true,message:"Güncellenecek veri bulunamadı!"})
          } else {
            res.json(data)}
          })
          
          
        .catch(err=>res.json(err));

})

router.delete('/:movie_id',(req,res,next)=>{
  Movie.findByIdAndDelete(req.params.movie_id,(err,data)=>{
    if(err) res.json(err)
    if(!data){
      res.json({status:false,message:'Böyle Bir Kayıt Bulunamadı'})
    } else {
      res.json(data)
    }
  })
})


export default router;
