import jwt from 'jsonwebtoken'
import Seller from '../models/seller.model.js'
export const Sellerisauthenticated = async(req, res ,next) =>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: 'You are not authenticated'})

    }
    
else{
 const decoded = jwt.verify(token,process.env.JWT_SECRET) 
 req.user = await Seller. findById(decoded._id) 

 next () 
}
}