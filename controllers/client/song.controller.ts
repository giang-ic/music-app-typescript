import { Response, Request } from "express";

// models
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const index = async (req: Request, res: Response) => {
    try{
        res.render('client/pages/songs/index', {
            title: "Danh sách bài nhạc"
        })
    }
    catch(error){

    }
}