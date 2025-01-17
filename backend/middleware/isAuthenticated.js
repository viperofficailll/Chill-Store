import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const isauthenticated = async(req, res ,next) =>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message: 'You are not authenticated'})

    }
    
else{
 const decoded = jwt.verify(token,process.env.JWT_SECRET) 
 req.user = await User. findById(decoded._id) 

 next () 
}
}