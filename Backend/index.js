import app from "./app.js";
import connectDB from "./src/config/db.js";
import dotenv from 'dotenv';
dotenv.config({
    path:'./src/.env'
})


connectDB()
.then(()=>{
 
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    })
})
.catch((error)=>{
    console.error(`Error starting the server: ${error.message}`);
    process.exit(1);
})