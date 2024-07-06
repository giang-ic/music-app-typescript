import { Response, Request } from "express";

// model 
import Topic from "../../models/topic.model";

// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
    try{
        const topics = await Topic.find({
            status: "active",
            deleted: false
        });

        res.render('admin/pages/topics/index', {
            title: "Quản lý chủ đề bài hát",
            topics
        })
    }
    catch(error){

    }
}