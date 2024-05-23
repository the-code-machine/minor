const mongoose= require("mongoose");
const {Schema}= mongoose;

const otp = new Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt: { type: Date, default: Date.now },},
   

 {
    collection:"otp"
   
});
const OTP = mongoose.models.otp || mongoose.model("otp", otp); //if user collection is already created then use that else create one as user.

export {OTP};