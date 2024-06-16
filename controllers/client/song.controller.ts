import { Response, Request } from "express";

export const index = async (req: Request, res: Response) => {
    try{
        res.send('Danh sacash bài nhạc');
    }
    catch(error){

    }
}