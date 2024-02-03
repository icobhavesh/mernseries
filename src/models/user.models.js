import mongoose, { Schema } from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
            {
              username: {
                type: String,
                require: true,
                unique: true,
                lowercase: true,
                trim: true,
                index: true,
              },
              email: {
                type: String,
                require: true,
                unique: true,
                lowercase: true,
                trim: true,
              },
              fullName: {
                type: String,
                require: true,
                trim: true,
                index: true,
              },
              avatar: {
                type: String, //url
                required: true,
              },
              coverImage: {
                type: String,
              },
              watchHistory: [
                {
                  type: Schema.Types.ObjectId,
                  ref: "Video",
                },
              ],
              password: {
                type: String,
                required: true,
              },
              refreshToken: {
                type: String,
              },
            },
            { timestamps: true }
          );
//todo this is a middleware
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next(); //problem har bar data save hoga change hoga phir check karega
  //hume kya krn hai jb password field bheju tab hi incryption krwana ho
});
userSchema.methods.isPasswordCorrect= async function (password){
  return await
bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken= function(){
  jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username:this.username,
      fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken=function(){
  jwt.sign(
    {
      _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
  
}
export  const  User= mongoose.model("User", userSchema);
