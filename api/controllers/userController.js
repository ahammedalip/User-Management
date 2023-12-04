import User from '../models/userModel.js'
import { errorhandler } from "../utils/errorHandler.js"
import bcryptjs from 'bcryptjs'


export const test = (req, res)=>{
    res.json({
        message: 'API is working'
    })
}

export const updateUser = async (req,res,next) => {
    console.log('coming here to update user controller')
    console.log('req.user.id', req.user.id);
    console.log('req.params.id', req.params.id);

    if(req.user.id !== req.params.id ){
        console.log('not equals coming');
        return next(errorhandler(401, 'You can update only your account!'))
    }

    try {
        console.log('coming here to update user controller')
        
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 2)
        }
        const updatedUser= await User.findByIdAndUpdate(
            req.params.id,{
                $set:{
                    username:  req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    profilePicture : req.body.profilePicture
                }
            }, {
                new: true
            }
        )
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
       
        next(error)
    }
}