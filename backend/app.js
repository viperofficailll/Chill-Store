import express from 'express';
import path from 'path'; // Import the 'path' module
import { sellerRouter } from './routes/Seller.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BuyerRouter } from './routes/Buyer.routes.js';

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'uploads' directory
const __dirname = path.resolve(); // Use path.resolve() to get the current directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up routes
app.use('/api/v1/seller/', sellerRouter);
app.use('/api/v1/buyer/', BuyerRouter);
