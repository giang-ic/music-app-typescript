import { Request, Response } from "express";

// model
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

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

// [GET] /admin/songs/create
export const createUI = async (req: Request, res: Response) => {
    try{
        const topics = await Topic.find({
            status: "active",
            deleted: false
        }).select("title");

        const singers = await Singer.find({
            status: "active",
            deleted: false
        }).select('fullName');

        res.render('admin/pages/songs/create', {
            title: "Tạo bài nhạc mới",
            topics,
            singers
        });
    }
    catch(error){

    }
}