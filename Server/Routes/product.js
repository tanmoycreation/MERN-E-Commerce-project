import express from "express"
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../Controllers/product.js";


const router = express.Router();

//add product

router.post ('/add',addProduct)

//get all product

router.get('/all',getProducts)

//get product by ID

router.get('/:id',getProductById)

//update product by ID
router.put('/:id',updateProductById)

//Delete product by id
router.delete('/:id',deleteProductById)

export default router;