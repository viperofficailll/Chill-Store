import { handlesellerlogin, handlesellerRegister, selleradditems, sellergetprofile, sellerlogout } from "../controllers/seller.controller.js";
import express from "express";
import {  Sellerisauthenticated } from "../middleware/SellerisAuthenticated.js";
 export const sellerRouter = express.Router();

sellerRouter.post("/register", handlesellerRegister)

sellerRouter.post("/login", handlesellerlogin)

sellerRouter.get("/profile/:id", Sellerisauthenticated,sellergetprofile)
sellerRouter.get("/logout", Sellerisauthenticated,sellerlogout)
sellerRouter.post("/additems", Sellerisauthenticated,selleradditems)