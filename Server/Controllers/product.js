import { Products } from "../Models/Product.js";

//Add product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;
  try {
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.json({ message: "product added sucessfully...!", product });
  } catch (error) {
    res.json(error.message);
  }
};

//get products
export const getProducts = async (req, res) => {
  let products = await Products.find().sort({ createdAt: -1 });
  res.json({ message: "All products", products });
};

//find product by ID
export const getProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) return res.json({ message: "Invalid ID" });
  res.json({ message: "Specific product", product });
};
// upodate product by ID
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) return res.json({ message: "Invalid ID" });
  res.json({ message: "Product has been Updated", product });
};
//Delete by ID
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndDelete(id);
  if (!product) return res.json({ message: "Invalid ID" });
  res.json({ message: "Product has been deleted", product });
};
