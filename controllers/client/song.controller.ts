import { Response, Request } from "express";

// models
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

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
        res.render('client/pages/songs/detail', {
            title: "Chi tiết:"
        });
    }
    catch(error){

    }
}