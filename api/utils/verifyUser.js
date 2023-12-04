import jwt from 'jsonwebtoken';
import { errorhandler } from './errorHandler.js'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('toekenenn', token)
    if (!token) return next(errorhandler(401, 'You are not authenticated'))
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, 'Invalid token'))
        req.user = user;
        next();
    })
}