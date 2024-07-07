// dotenv
import dotenv from "dotenv";
dotenv.config();

// cloudinary
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

// stream upload
let streamUpload = (buffer: any) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if(result) {
              resolve(result);
            } 
            else {
              reject(error);
            }
          }
        );  
      streamifier.createReadStream(buffer).pipe(stream);
    });
};  
// end stream upload

// upload to cloudinary
export const uploadToCloudinary = async (buffer: any) => {
    let result = await streamUpload(buffer);
    // console.log(result);
    return result["url"];
}
// end upload to cloudinary