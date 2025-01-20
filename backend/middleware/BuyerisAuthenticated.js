import jwt from 'jsonwebtoken'
import Buyer from '../models/buyer.model.js'
export const Buyerisauthenticated = async(req, res ,next) =>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: 'You are not authenticated'})
        

    }
    
else{
 const decoded = jwt.verify(token,process.env.JWT_SECRET) 
 req.user = await Buyer. findById(decoded._id) 

 next () 
}
}