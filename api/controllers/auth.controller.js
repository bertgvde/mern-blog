import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET 
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
