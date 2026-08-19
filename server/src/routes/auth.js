import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router=express.Router();

router.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  try{
    const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const adminPassword = String(process.env.ADMIN_PASSWORD || '');

    if(!adminEmail || !adminPassword){
      return res.status(500).json({message:'Admin credentials are not configured in the environment.'});
    }

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const isBootstrapAdmin = normalizedEmail === adminEmail && password === adminPassword;

    let user=await User.findOne({email: normalizedEmail});

    if(!user && isBootstrapAdmin){
      const hash=await bcrypt.hash(password,12);
      user=await User.create({email: normalizedEmail,password:hash,role:'admin'});
    }

    if(user && !(await bcrypt.compare(password,user.password)) && isBootstrapAdmin){
      user.password = await bcrypt.hash(password,12);
      user.role = user.role || 'admin';
      await user.save();
    }

    if(!user || !(await bcrypt.compare(password,user.password)))return res.status(401).json({message:'Invalid email or password'});
    const token=jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user:{email:user.email,role:user.role}});
  }catch(err){res.status(500).json({message:err.message});}
});
export default router;
