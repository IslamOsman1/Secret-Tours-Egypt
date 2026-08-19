import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router=express.Router();
router.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user && email===process.env.ADMIN_EMAIL){
      const hash=await bcrypt.hash(process.env.ADMIN_PASSWORD||'ChangeMe123!',12);
      user=await User.create({email,password:hash});
    }
    if(!user || !(await bcrypt.compare(password,user.password)))return res.status(401).json({message:'Invalid email or password'});
    const token=jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user:{email:user.email,role:user.role}});
  }catch(err){res.status(500).json({message:err.message});}
});
export default router;
