import express from 'express';
import {  handlebuyerlogin, handlesignup } from '../controllers/Buyer.controller.js';
export const BuyerRouter = express.Router();

// BuyerRouter.post('/login',loginhandeler);
BuyerRouter.post('/signup',handlesignup);
BuyerRouter.post('/login',handlebuyerlogin);