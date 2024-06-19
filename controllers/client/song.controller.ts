import { Response, Request } from "express";

// models
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import LikeSong from "../../models/likes-song.model";
import FavoriteSong from "../../models/favorites-song.model";

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

        // check user has liked song or not
        if(res.locals.user){
            const userLikeSong = await LikeSong.findOne({
                songID: song.id,
                "userIDs": res.locals.user.id
            });
            
            song["likeStatus"] = userLikeSong ? "active" : "";

            const userFavoriteSong = await FavoriteSong.findOne({
                songID: song.id,
                "userIDs": res.locals.user.id
            });

            song["favoriteStatus"] = userFavoriteSong ? true : false;
        }

        // get singer's song
        const singer = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        }).select("fullName");

        // get topic's song
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
        console.log(error);
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
        console.log(error);
    }
}

// [PATCH] /songs/favorite/:status/:songID
export const favorite = async (req: Request, res: Response) => {
    try{
        const songID: string = req.params.songID;
        const userID: string = res.locals.user.id;
        const status: string = req.params.status;

        // save user favorite song on Database
        const favoriteSongExist = await FavoriteSong.findOne({
            songID: songID
        });

        const userExistInFavoriteSong = await FavoriteSong.findOne({
            songID: songID,
            "userIDs": userID
        });

        if(status === "favorite"){
            if(!favoriteSongExist){
                const favoriteSong = new FavoriteSong({
                    songID: songID,
                    userIDs: [userID]
                });
                await favoriteSong.save();
            }
            else{
                if(!userExistInFavoriteSong){
                    await FavoriteSong.updateOne(
                        {songID: songID},
                        {
                            $push: {
                                userIDs: userID
                            }
                        }
                    );
                }
            }
        }
        else{
            if(favoriteSongExist){
                await FavoriteSong.updateOne(
                    {songID: songID},
                    {
                        $pull: {
                            userIDs: userID
                        }
                    }
                );
            }
        }

        res.status(200).json({
            code: 200,
            message: "Đã yêu thích bài hát"
        })
    }
    catch(error){

    }
}
