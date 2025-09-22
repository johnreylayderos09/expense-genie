// api/login.js (Vercel serverless or Express)
import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Here you might generate and return a JWT token, for example
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      // token: "your-jwt-token"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
