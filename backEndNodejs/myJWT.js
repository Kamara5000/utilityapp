require('dotenv').config();
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const myJwtMdw = (req, res, next)=>{
    let {headers} = req;
    //console.log(headers);
    let {authorization} = headers;
    let myToken = authorization.split(' ');
     let tok = myToken[1];
     //console.log(tok)
     
     jwt.verify(tok, secret, (err, user)=>{
     //console.log(user)
 
        if(err){
           
         //    res.statusCode
            res.json({error: "something is wrong"})
        } else{
        req.body=user;   
        next();
        }
     })
}   

module.exports = {myJwtMdw};