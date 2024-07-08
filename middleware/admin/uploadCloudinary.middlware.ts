// instance Express 
import { NextFunction, Request, Response} from "express";

import { uploadToCloudinary } from "../../helper/uploadToCloudinary.helper";
import { link } from "fs";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise <void> => {
  try{
      if(req["file"]){
        const linkImage = await uploadToCloudinary(req["file"].buffer);
        req.body[req["file"].fieldname] = linkImage;
      }
      next();
  }
  catch(error){
      console.log(error);
  }
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(req["files"]){
      for(const key in req["files"]){
        const links = []; // contain file audio || avatar

        for(const item of req["files"][key]){
          const linkImage = await uploadToCloudinary(item.buffer);
          links.push(linkImage);
        }
        req.body[key] = links;
      }
    }
    next(); // auto next middleware
  }
  catch(error){
    console.log(error);
  }
}