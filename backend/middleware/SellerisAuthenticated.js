import jwt from 'jsonwebtoken';
import Seller from '../models/seller.model.js';

export const Sellerisauthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded._id exists
    if (!decoded._id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Fetch the user (seller) by _id
    const user = await Seller.findById(decoded._id);

    // If no seller is found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Seller not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware
    next();

  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
