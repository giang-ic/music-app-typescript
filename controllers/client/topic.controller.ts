import {Response, Request} from "express";

export const index = async (req: Request, res: Response) => {
    try{
        res.send("Danh Mục Bài Hát");
    }
    catch(error){
        console.warn(error);
    }
}