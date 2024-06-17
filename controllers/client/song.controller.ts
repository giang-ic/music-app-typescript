import { Response, Request } from "express";

// models
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { title } from "process";

// [GET] /songs/:topicSlug
export const index = async (req: Request, res: Response) => {
    try{
        
        // FIND TOPIC
        const topicSlug: string = req.params.topicSlug;
        const topic = await Topic.findOne({
            slug: topicSlug,
            status: "active",
            deleted: false
        });

        // FIND SONGS WITH CONDITION 'TOPIC'
        const songs = await Song.find({
            topicId: topic._id,
            status: "active",
            deleted: false
        }).select('title avatar like slug singerId');
            
        // ADD SINGER NAME
        for(const song of songs){
            const singer = await Singer.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            }).select("fullName");

            song["singer"] = singer.fullName || "Đang cập nhật";        
        }

        res.render('client/pages/songs/index', {
            title: "Danh sách bài nhạc",
            topic,
            songs
        })
    }
    catch(error){

    }
}

// [GET] /songs/detail/:songSlug
export const detail = async (req: Request, res: Response) => {
    try{

        const songSlug: string = req.params.songSlug;
        const song = await Song.findOne({
            slug: songSlug,
            status: "active",
            deleted: false
        });

        const singer = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        }).select("fullName");

        const topic = await Topic.findOne({
            _id: song.topicId,
            status: "active",
            deleted: false
        }).select("title");

        res.render('client/pages/songs/detail', {
            title: `Chi tiết bài: ${song.title}`,
            song,
            singer,
            topic
        });
    }
    catch(error){

    }
}

// [PATCH] /songs/like/:songID
export const like = async (req: Request, res: Response) => {
    try{
        const songID: string = req.params.songID;
        

        const song = await Song.findOne({
            _id: songID,
            status: "active",
            deleted: false
        }).select("like");

        const updateLike: number = song.like + 1;

        await Song.updateOne(
            {
                _id: songID,
                status: "active",
                deleted: false
            },{
                like: updateLike
            }
        );

        res.status(200).json({
            code: 200,
            message: "Đã like",
            like: updateLike
        });
    }
    catch(error){

    }
}