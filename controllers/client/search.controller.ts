// instance Response & Request
import { Response, Request } from "express";

// models
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const result = async (req: Request, res: Response) => {
    try{
        const keyword: string = `${req.query.keyword}`;
        const regexKeyword: RegExp = new RegExp(keyword, "i"); // regex
        
        const songs = await Song.find({
            title: regexKeyword,
            status: "active",
            deleted: false
        }).select("-lyrics -description");

        for(const song of songs){
            const singer = await Singer.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            }).select("fullName");

            song["singer"] = singer.fullName || "Đang cập nhật";
        }


        res.render("client/pages/search/result", {
            title: "Kết quả tìm kiếm",
            songs,
            keyword
        });
    }
    catch(error){
        console.log(error);
    }
}