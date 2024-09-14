import { Cart } from "../Models/Cart.js";


// Add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // Update existing item
    cart.items[itemIndex].qty += qty;
    // Set the price to the new total price based on quantity
    cart.items[itemIndex].price = price * cart.items[itemIndex].qty;
  } else {
    // Add new item
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items Add To Cart", cart });
};


// //get user Cart
// Get user Cart
export const userCart = async (req, res) => {
  const userId = req.user; // Make sure to use req.user for dynamic user ID
  
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if none exists for the user
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.json({ message: "User cart retrieved", cart });
  } catch (error) {
    console.error('Error retrieving user cart:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// //Remove product from cart cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart Not Found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  res.json({ message: "product remove form cart" });
};
//clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ items: [] });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.json({ message: "cart cleared" });
};

//Decrese qty frpm cart
export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.price / item.qty;

      item.qty -= qty;
      item.price -= pricePerUnit * qty;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    res.json({ message: "Invalid Product Id" });
  }

  await cart.save();
  res.json({ message: "Item qty decreased", cart });
};
