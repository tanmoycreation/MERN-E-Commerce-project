import express from "express";
import mongoose from "mongoose";
import bodyParsr from 'express';
import userRouter from "./Routes/user.js"; // Correct relative path
import productRouter from "./Routes/product.js"
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';

import  cors from 'cors';


const app = express();

//middleware 
app.use(bodyParsr.json());
//middleware
app.use(cors({
  origin: true,
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
}))

//home testing route
app.get("/", (req, res) => res.json({ message: "this is home page" }));

//user Router
app.use("/api/user", userRouter);

//product Routes
app.use("/api/product", productRouter);

//cart Router
app.use('/api/cart',cartRouter)

//address Router

app.use('/api/address',addressRouter)





mongoose
  .connect(
    "mongodb+srv://tanmoykarjee10000:GrhZYXigHmjx0h4G@cluster0.sbvgy.mongodb.net/",
    {
      dbName: "E_Commerce_Project",
    }
  )
  .then(() => console.log("MongoDb Connected Sucessfully..!"))
  .catch(() => console.log("error"));

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
