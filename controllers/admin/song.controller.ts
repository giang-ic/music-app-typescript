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

// [POST] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    try{
        if(req.body["avatar"]){
            req.body.avatar = req.body["avatar"][0]; // only one file avatar of music
        }

        if(req.body["audio"]){
            req.body.audio = req.body["audio"][0]; // only one file audio
        }
        const record = new Song(req.body);
        await record.save();
        res.redirect('back');
    }
    catch(error){

    }
}

// [GET] /admin/songs/edit/:songID
export const editUI = async (req: Request, res: Response) => {
    try{
        // get song needed edit
        const songID = req.params.songID;
        const song = await Song.findOne({
            _id: songID,
            status: "active",
            deleted: false
        });

        // get topics
        const topics = await Topic.find({
            status: "active",
            deleted: false
        });

        // get singers
        const singers = await Singer.find({
            status: "active",
            deleted: false
        });

        res.render("admin/pages/songs/edit", {
            title: "Chỉnh sửa bài nhạc",
            song,
            topics,
            singers
        });
    }
    catch(error){

    }
}