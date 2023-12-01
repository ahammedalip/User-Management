import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPass = bcryptjs.hashSync(password, 2);

    const newUser = new User({
        username,
        email, password: hashedPass
    })
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created succesfully' })

    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorhandler(401, 'User not found'))
        const validPass = bcryptjs.compareSync(password, validUser.password)
        if (!validPass) return next(errorhandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPass, ...rest } = validUser._doc
        const expiry = new Date(Date.now() + 3600000)
        res.cookie('acces_token', token, { httpOnly: true, expires: expiry }).status(200).json(rest)
    }
    catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // console.log('user.........',user) 

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            // console.log('tojen', token)
            const { password: hashedPass, ...rest } = user._doc

            const expiry = new Date(Date.now() + 3600000)
            res.cookie('acces_token', token, { httpOnly: true, expires: expiry }).status(200).json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPass = bcryptjs.hashSync(generatedPassword, 2);
            
            const newUser = new User({
                username: req.body.username.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPass,
                profilePicture: req.body.photo
            })
            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: hashedpass2, ...rest} = newUser;
            const expiry = new Date(Date.now()+3600000);
            res.cookie('acces_token', token,{
                httpOnly:true, expires: expiry
            }).status(200).json(rest);
        }
    } catch (error) {
        // console.log('error,,,,,')
        next(error)
    }
}