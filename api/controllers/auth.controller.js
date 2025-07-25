import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email || username.trim() === '' || password.trim() === '' || email.trim() === '') {
            return res.status(400).json({ message: 'Username, password and email are required' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });       
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }

    const newUser = new User({
        username,
        password: hashedPassword,
        email
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
