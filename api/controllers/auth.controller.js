import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
      if (!username) {
    return res.status(400).json({ error: 'username is required' });
  }
    if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
    if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = new User({ username, email, password:hashedPassword });
    try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
         res.status(500).json({ message: error.message });  
        // next(error);      
    }
   
} 


export const  signin = async(req, res, next)=> {
    const { email, password } = req.body;
    try {

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET)
    const {password:pass, ...rest} =validUser._doc
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', 
    }).status(200).json(rest);
} catch (error) {
    next(error);
}
  
    }