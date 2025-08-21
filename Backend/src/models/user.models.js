import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:["user","admin"],
        required:true,
        default:"user",
    },
    avatar:{
        type:String
    },
    googleId:{
        type:String,
    },
    lastLogin:{
        type:Date,  
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    collegeName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
    },
    department:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
    },
    year:{
        type:Number,
        required:true,
        enum:[1,2,3,4],
        trim:true,
      
    },
      refreshToken:{
        type:String
    },
},{timestamps:true})

// Pre-save hook to hash password before saving
userSchema.pre('save',async function(next){  //pre is middleware that runs before save
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password,5) //it will hash the password
})

// Method to compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//generate JWT access token
userSchema.methods.generateAccessToken = function() {
    const token = jwt.sign(
        {id:this.id,role:this.role,fullName:this.fullName,email:this.email},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1d'}
)
return token;
}
//generate jwt refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {id:this.id,role:this.role,fullName:this.fullName,email:this.email},
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // longer life
  );
};

const User = mongoose.model("User",userSchema)

export default User;