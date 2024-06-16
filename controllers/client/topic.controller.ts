import {Response, Request} from "express";

// models
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) => {
    try{
        const topics = await Topic.find({
            deleted: false
        });
        console.log(topics);
        
        res.render('client/pages/topics/index', {
            title: "Danh mục bài hát"
        });
    }
    catch(error){
        console.warn(error);
    }
}