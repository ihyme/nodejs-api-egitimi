import express from 'express'
const router = express.Router();
import User from '../models/User.js'
import bcryptjs from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken';

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

/* POST register page */
router.post('/register',(req,res)=>{
const {uname,pass} = req.body;
bcryptjs.hash(pass,10).then((hash)=>{
  const user = new User({
    uname,
    pass:hash
  });
  user.save()
      .then((data)=>{
          res.json(data)})
      .catch((err)=>{
          res.json(err)
     })
  })
})

router.post('/login',(req,res)=>{
  const { uname, pass } = req.body;
  User.findOne({uname},(err,data)=>{
    console.log(data)
    if(err){
      res.json(err)
    } else {
      if(!uname){

        res.json({status:false,message:"Kullanıcı Bulunamadı"})
      } else {
         bcryptjs.compare(pass,data.pass).then((result)=>{
          if(result){
            const payload = {
              uname
            }
            const token = jsonwebtoken.sign(payload,req.app.get("secretKey"),{
              expiresIn:720, //12 saat
            })
            res.json({
              status:true,
              message:"Login Successfuly",
              data:{token:token}
            })
          }else {
            res.json({status:false,message:"Doğru parola girmeniz gerekmektedir."})
          }
         })
      }


    }
  })

});


export default router;
