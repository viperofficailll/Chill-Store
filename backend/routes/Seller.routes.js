import { handlesellerlogin, handlesellerRegister, selleradditems, sellergetprofile, sellerlogout } from "../controllers/seller.controller.js";
import express from "express";
import { isauthenticated } from "../middleware/isAuthenticated.js";
 export const sellerRouter = express.Router();

sellerRouter.post("/register", handlesellerRegister)

sellerRouter.post("/login", handlesellerlogin)

sellerRouter.get("/profile/:id", isauthenticated,sellergetprofile)
sellerRouter.get("/logout", isauthenticated,sellerlogout)
sellerRouter.post("/additems", isauthenticated,selleradditems)