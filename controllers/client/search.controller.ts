// instance Response & Request
import { Response, Request } from "express";

import unidecode from "unidecode";

// models
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const result = async (req: Request, res: Response) => {
    try{
        const keyword: string = `${req.query.keyword}`;
        
        // condition find with title
        const keywordRegexTitle: RegExp = new RegExp(keyword, "i"); // regex

        // condition find with slug
            /**step 1: unidecode keyword */
        const keywordUnideCode: string = unidecode(keyword);

            /**step 2: replace whitespaces to character "-" */
        const keywordReplaceWhiteSpace: string = keywordUnideCode.replace(/\s+/g, '-');

            /**step 3: find with Case-insensitive search. */
        const keywordRegexSlug: RegExp = new RegExp(keywordReplaceWhiteSpace, "i");

        const songs = await Song.find({
            $or: [
                {
                    title: keywordRegexTitle
                },
                {
                    slug: keywordRegexSlug
                }
            ],
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