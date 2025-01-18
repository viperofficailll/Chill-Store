import express from 'express';
import { sellerRouter } from './routes/Seller.routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { BuyerRouter } from './routes/Buyer.routes.js';
export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/seller/',sellerRouter);
app.use('/api/v1/buyer/',BuyerRouter);