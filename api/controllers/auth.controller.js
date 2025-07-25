import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email || username.trim() === '' || password.trim() === '' || email.trim() === '') {
            next(errorHandler(400, 'Username, password and email are required'));}
    } catch (error) {
        next(errorHandler(500, 'Server error'));       
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    if (!hashedPassword) {
        return next(errorHandler(500, 'Error hashing password'));}

    const newUser = new User({
        username,
        password: hashedPassword,
        email
    });
try {
    await newUser.save();
    res.json({
        success: true, message: 'User created successfully'})}
    catch (error) {
        next(errorHandler(409, 'User already exists'));
    }
}
