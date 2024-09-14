import express from "express"
import { addToCart, userCart, removeProductFromCart, clearCart,decreaseProductQty} from "../Controllers/cart.js";
import { Authenticated } from "../Middlewares/auth.js";



const router = express.Router();

// //Add To cart

router.post('/add',Authenticated,addToCart);
// //get User Cart
router.get('/user',Authenticated,userCart);

//remove product from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart);
// clear cart
router.delete('/clear',Authenticated,clearCart);
//decrease itme qty
router.post("/--qty",Authenticated, decreaseProductQty)

export default router;

