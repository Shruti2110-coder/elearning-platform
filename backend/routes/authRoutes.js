import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//register

router.post("/register", async(req, res)=>{
    const { email, name, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user =await User.create({ name, email, password: hashed});
    res.json(user);
})

//login

router.post("/login", async(req, res)=>{
    const{ email, password} = req.body;
    const user = await User.findOne({ email});
    if(!user) return res.status(404).json({message: "user not found"});
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) return res.status(400).json({message: "wrong password"});

     const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)

     res.json({token, user})
     });
 export default router;