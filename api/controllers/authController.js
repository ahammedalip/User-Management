import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
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
        res.status(500).json(error.message)
    }

    

}

