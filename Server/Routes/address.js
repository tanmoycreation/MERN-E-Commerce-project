import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router = express.Router();
//add adress
router.post("/add", Authenticated, addAddress);

//get address
router.get('/get',Authenticated,getAddress)

export default router;
