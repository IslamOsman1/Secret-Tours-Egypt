import mongoose from 'mongoose';
const DaySchema=new mongoose.Schema({day:Number,title:String,text:String},{_id:false});
const TourSchema=new mongoose.Schema({
  title:{type:String,required:true},slug:{type:String,required:true,unique:true},category:{type:String,required:true,index:true},city:String,duration:String,
  price:{type:Number,required:true},oldPrice:Number,rating:{type:Number,default:5},reviews:{type:Number,default:0},featured:{type:Boolean,default:false},badge:String,
  image:String,publicId:String,gallery:[String],excerpt:String,description:String,highlights:[String],itinerary:[DaySchema],status:{type:String,default:'published',enum:['draft','published']}
},{timestamps:true});
export default mongoose.model('Tour',TourSchema);
