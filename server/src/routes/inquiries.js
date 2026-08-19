import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { protect } from '../middleware/auth.js';
const router=express.Router();
router.post('/',async(req,res)=>{try{const interests=req.body.interests?[].concat(req.body.interests):[];res.status(201).json(await Inquiry.create({...req.body,interests}))}catch(err){res.status(400).json({message:err.message})}});
router.get('/',protect,async(req,res)=>{try{res.json(await Inquiry.find().sort({createdAt:-1}))}catch(err){res.status(500).json({message:err.message})}});
router.patch('/:id',protect,async(req,res)=>{try{res.json(await Inquiry.findByIdAndUpdate(req.params.id,req.body,{new:true}))}catch(err){res.status(400).json({message:err.message})}});
export default router;
