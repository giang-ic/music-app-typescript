import { Response, Request } from "express";

// models
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import LikeSong from "../../models/likes-song.model";

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

// [PATCH] /songs/like/:status/:songID
export const like = async (req: Request, res: Response) => {
    try{
        const songID: string = req.params.songID;
        
        const song = await Song.findOne({
            _id: songID,
            status: "active",
            deleted: false
        }).select("like");

        // update amount of like
        const status: string = req.params.status; // like or dislike
        const updateLike: number =  status === "like" ? song.like + 1 : song.like - 1;

        await Song.updateOne(
            {
                _id: songID,
                status: "active",
                deleted: false
            },{
                like: updateLike
            }
        );

        // save user liked song
        const likeSong = await LikeSong.findOne({
            songID: songID,
        });
        
        if(status === "like"){
            // check userID exist in LikeSong ?
            const userExistInLikeSong = await LikeSong.findOne({
                songID: songID,
                "userIDs": res.locals.user.id
            });
            
            if(likeSong && !userExistInLikeSong){
                await LikeSong.updateOne(
                    {songID: songID},
                    {
                        $push: {
                            userIDs: res.locals.user.id
                        }
                    }
                )
            }
    
            else if(!likeSong){
                const record = new LikeSong({
                    songID: songID,
                    userIDs: [res.locals.user.id]
                });
                await record.save();
            }
        }
        else {
            if(likeSong){
                await LikeSong.updateOne(
                    {songID: songID},
                    {
                        $pull: {
                            userIDs: res.locals.user.id
                        }
                    }
                )
            }
            // nếu số lượng like về 0, cũng không cần xóa Database
        }
        
        res.status(200).json({
            code: 200,
            message: status === "like" ? "Đã like bài nhạc" : "Đã dislike bài nhạc",
            like: updateLike
        });
    }
    catch(error){

    }
}