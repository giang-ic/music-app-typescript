import {Response, Request} from "express";

// models
import Topic from "../../models/topic.model";

// [GET] /topics/
export const index = async (req: Request, res: Response) => {
    try{

        interface findInterface {
            title?: string,
            description?: string,
            status: string,
            slug?: string,
            deleted: Boolean
        }

        const findObject : findInterface = {
            status: "active",
            deleted: false
        }

        const topics = await Topic.find(findObject);
        
        res.render('client/pages/topics/index', {
            title: "Chủ đề bài hát",
            topics
        });
    }
    catch(error){
        console.warn(error);
    }
}