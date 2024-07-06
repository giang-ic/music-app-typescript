import { Request, Response } from "express";

// model
import Song from "../../models/song.model";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
    try{
        const songs = await Song.find({
            status: "active",
            deleted: false
        });

        res.render('admin/pages/songs/index', {
            title: "Danh sách bài nhạc",
            songs
        });
    }
    catch(error){

    }
}