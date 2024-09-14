import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

//user register

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.json({ message: "User already exist", sucess: false });
    const hashPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPass });
    res.json({ message: "User register Sucessfullu...!", user, sucess: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "Uesr not Find", sucess: false });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ message: "Invalid Credential", sucess: false });
    const token = jwt.sign({ userId:user._id },"!@#$$#$$#()",{
      expiresIn:'365d'
    })
    res.json({ message: `Welcome ${user.name}`,token, sucess: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get Allusers
export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createAt: -1 });
    res.json({ users });
  } catch (error) {
    res.json(error.message);
  }
};


//get profile
export const profile = async(req,res)=>{
res.json({user: req.user})
}