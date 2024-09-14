import { Address } from "../Models/Address.js";


export const addAddress = async (req, res) => {
  try {
    const { fullName, address, city, state, country, pincode, phoneNumber } =
      req.body;
    const userId = req.user;
    // Create a new address
    const newAddress = new Address({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    // Save the address
    await newAddress.save();

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress, success:true });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddress = async(req,res)=>{
    let address = await Address.find({userId: req.user}).sort({createdAt: -1})
    res.json({message: "address", userAddress: address[0]})
}
