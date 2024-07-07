import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// instance Express 
import { NextFunction, Request, Response} from "express";

// dotenv
import dotenv from "dotenv";
dotenv.config();

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

// upload
const upload = async (buffer: any) => {
  let result = await streamUpload(buffer);
  // console.log(result);
  return result["url"];
}

// end upload
export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise <void> => {
  try{
      if(req["file"]){
        const linkImage = await upload(req["file"].buffer);
        req.body[req["file"].fieldname] = linkImage;
      }
      next();
  }
  catch(error){
      console.log(error);
  }
}