import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/errorHandler.js';

export const signup = async (req, res, next) => {
    const { user, email, password } = req.body;
    const hashedPass = bcryptjs.hashSync(password,2);

    const newUser = new User({
        username: user,
        email, password: hashedPass
    })
    try {
        await newUser.save();
    res.status(201).json({message:'User created succesfully'})
        
    } catch (error) {
       next(error);
    }

    

}

