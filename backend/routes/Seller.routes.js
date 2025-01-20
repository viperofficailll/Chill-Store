import { delteproduct, updateProduct, getSellerItems, handlesellerlogin, handlesellerRegister, selleradditems, sellergetprofile, sellerlogout, getProductDetails } from "../controllers/seller.controller.js";
import express from "express";
import {  Sellerisauthenticated } from "../middleware/SellerisAuthenticated.js";
 export const sellerRouter = express.Router();

sellerRouter.post("/register", handlesellerRegister)

sellerRouter.post("/login", handlesellerlogin)

sellerRouter.get("/profile/:id", Sellerisauthenticated,sellergetprofile)
sellerRouter.get("/logout", Sellerisauthenticated,sellerlogout)
sellerRouter.post("/additems", Sellerisauthenticated,selleradditems)
sellerRouter.get("/allitems", Sellerisauthenticated,getSellerItems)

sellerRouter.delete("/items/:id", Sellerisauthenticated, delteproduct);

// Backend: Routes
sellerRouter.get("/items/:id", Sellerisauthenticated, getProductDetails);
sellerRouter.put("/items/:id", Sellerisauthenticated, updateProduct);
