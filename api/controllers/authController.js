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
        const {password: hashedPass, ...rest} = validUser._doc
        const expiry = new Date(Date.now()+3600000)
        res.cookie('acces_token', token, { httpOnly: true , expires: expiry}).status(200).json(rest)
    }
    catch (error) {
        next(error)
    }
}