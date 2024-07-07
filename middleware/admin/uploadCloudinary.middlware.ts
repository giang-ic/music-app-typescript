// instance Express 
import { NextFunction, Request, Response} from "express";

import { uploadToCloudinary } from "../../helper/uploadToCloudinary.helper";

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