import express from 'express';
import {   handlebuyerlogin, handlesignup, orderhandeler, productdetails, profile } from '../controllers/Buyer.controller.js';
import { Buyerisauthenticated } from '../middleware/BuyerisAuthenticated.js';
import { getallproducts } from '../controllers/products.controller.js';
export const BuyerRouter = express.Router();

// BuyerRouter.post('/login',loginhandeler);
BuyerRouter.post('/signup',handlesignup);
BuyerRouter.post('/login',handlebuyerlogin);
BuyerRouter.get('/allitems', Buyerisauthenticated,getallproducts );
BuyerRouter.get('/profile', Buyerisauthenticated,profile );
BuyerRouter.get('/productdetails/:id', Buyerisauthenticated, productdetails );
BuyerRouter.post('/order', Buyerisauthenticated,orderhandeler  );