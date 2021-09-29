import jsonwebtoken from "jsonwebtoken"
export default (req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(token){
        jsonwebtoken.verify(token,req.app.get("secretKey"),(err,data)=>{
            if(err){
                res.json({
                    status:false,
                    message:"Token Not Found"
                })
            } else {
                req.decode = data;
                next();
            }
        })
    } else {
        res.json({
            status:false,
            message:"Token Not Found"
        })
    }
}