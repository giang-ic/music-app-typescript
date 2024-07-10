import { Response, Request } from "express";
import unidecode from "unidecode";

// model 
import Topic from "../../models/topic.model";

// interface
import { findTopicInterface, filterStatusInterface } from "../../config/interface";

// helper
import * as filterHelper from "../../helper/filter.helper";

// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
    try{
        const findObjectTopic: findTopicInterface = {
            deleted: false
        };

        // Filter stautus
        const status: string = `${req.query.status}` || "";
        if(req.query.status){    
            findObjectTopic["status"] = status;// không gán biến status vào vì nó sẽ bị tìm theo status = ""
        }
        const filterStatusArray: filterStatusInterface[] = filterHelper.status(req.query);
        // End Filter stautus
        
        // Search keyword
        const keyword: string = `${req.query.keyword}` || "";

        const keywordUnidecode: string = unidecode(keyword);
        const keywordReplaceWhiteSpace: string = keywordUnidecode.replace(/\s+/g, "-");
        
        const keywordRegexTitle: RegExp = new RegExp(keyword, "i"); // find keyword with title
        const keywordRegexSlug: RegExp = new RegExp(keywordReplaceWhiteSpace, "i"); // find keyword with slug
        // End Search keyword

        let topics;
        if(req.query.keyword){
            const record = await Topic.find({
                $or: [
                    {title: keywordRegexTitle},
                    {slug: keywordRegexSlug}
                ],
                ...findObjectTopic
            });
            topics = record;
        }
        
        else {
            const record = await Topic.find(findObjectTopic);
            topics = record;
        }

        res.render('admin/pages/topics/index', {
            title: "Quản lý chủ đề bài hát",
            topics,
            filterStatusArray
        })
    }
    catch(error){
        console.log(error);
    }
}