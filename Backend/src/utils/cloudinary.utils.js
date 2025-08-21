
import cloudinary from "cloudinary"
import fs from 'fs';
import apiError from '../utils/apiError.utils.js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the correct path
dotenv.config({
    path:  '../.env'
});


cloudinary.config({
    cloud_name:'drzdp2nb6',
    api_key:'912432566715352',
    api_secret:'OT_QFq3-k2iRDC84-1Rpu2RugBM',
});
// Debug: log env variables to verify they are loaded
console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);


const uploadeToCloudinary = async (filepath) => {
    try {
        if (!filepath) throw new apiError(400, "File path is required");
        const uploader = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        });
        fs.unlinkSync(filepath); // Remove the file after upload
        return uploader;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath); // Clean up the file if upload fails
        }
        // Attach the real error message for debugging
        throw new apiError(500, `Failed to upload file to Cloudinary: ${error.message || error}`);
    }
}

export default uploadeToCloudinary;