import jwt from 'jsonwebtoken';
import config from '../config/environment';

export function isLoggedin() {
    return function(req,res, next){
        const token = req.header('Token');
        if(!token){
            return res.status(401).send({ message: 'Access forbidden.' });
        }
        try {
            const user = jwt.verify(token,config.getConstants().token.secret);
            req.user = user;
            next();
        } catch(err){
           return res.status(400).send({ message: 'Invalid session. Please login again.' });
        }
    }
}