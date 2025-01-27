import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
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