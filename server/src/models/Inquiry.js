import mongoose from 'mongoose';
const InquirySchema=new mongoose.Schema({
  type:{type:String,default:'contact'},name:{type:String,required:true},email:String,phone:String,country:String,arrivalDate:String,duration:String,travelers:String,budget:String,interests:[String],message:String,status:{type:String,default:'new'}
},{timestamps:true});
export default mongoose.model('Inquiry',InquirySchema);
