import  { mongoose } from "mongoose";


const connectDB = async() => {
   try {
     await mongoose.connect(`${process.env.MONGO_STRING}${process.env.DB_NAME}`)
     console.log(`db connected successfully to ${process.env.DB_NAME}`);
   } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
   }
    
}

export default connectDB;